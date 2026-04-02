import { useState, useEffect, useCallback } from 'react'

interface UseAsyncStateOptions<T> {
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  retryCount?: number
}

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  retryCount: number
}

export function useAsyncState<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncStateOptions<T> = {}
) {
  const { initialData, onSuccess, onError, retryCount: maxRetries = 3 } = options
  
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData || null,
    loading: false,
    error: null,
    retryCount: 0
  })

  const execute = useCallback(async (retryCount = 0) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const data = await asyncFunction()
      setState({
        data,
        loading: false,
        error: null,
        retryCount
      })
      onSuccess?.(data)
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error))
      
      if (retryCount < maxRetries) {
        // Retry with exponential backoff
        setTimeout(() => execute(retryCount + 1), Math.pow(2, retryCount) * 1000)
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorObj,
          retryCount
        }))
        onError?.(errorObj)
      }
    }
  }, [asyncFunction, onSuccess, onError, maxRetries])

  const reset = useCallback(() => {
    setState({
      data: initialData || null,
      loading: false,
      error: null,
      retryCount: 0
    })
  }, [initialData])

  const retry = useCallback(() => {
    execute(state.retryCount + 1)
  }, [execute, state.retryCount])

  useEffect(() => {
    execute()
  }, [execute])

  return {
    ...state,
    execute,
    reset,
    retry
  }
}

// Hook pour les opérations CRUD avec état de chargement
export function useCrudOperation<T, P = any>(
  operation: (params?: P) => Promise<T>,
  options: UseAsyncStateOptions<T> = {}
) {
  const [isOperating, setIsOperating] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async (params?: P) => {
    setIsOperating(true)
    setError(null)
    
    try {
      const result = await operation(params)
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err))
      setError(errorObj)
      options.onError?.(errorObj)
      throw errorObj
    } finally {
      setIsOperating(false)
    }
  }, [operation, options])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsOperating(false)
  }, [])

  return {
    data,
    isOperating,
    error,
    execute,
    reset
  }
}

// Hook pour gérer plusieurs états de chargement
export function useLoadingStates() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }))
  }, [])

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false
  }, [loadingStates])

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(Boolean)
  }, [loadingStates])

  const resetAll = useCallback(() => {
    setLoadingStates({})
  }, [])

  return {
    setLoading,
    isLoading,
    isAnyLoading,
    loadingStates,
    resetAll
  }
}
