import { useState, useEffect } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`)
}

export function useIsMobile(): boolean {
  return !useBreakpoint('md')
}

export function useIsTablet(): boolean {
  return useBreakpoint('md') && !useBreakpoint('lg')
}

export function useIsDesktop(): boolean {
  return useBreakpoint('lg')
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Hook pour le responsive design des layouts
export function useResponsiveLayout() {
  const windowSize = useWindowSize()
  const isMobileBreakpoint = useMediaQuery('(max-width: 767px)')
  const isTabletBreakpoint = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isDesktopBreakpoint = useMediaQuery('(min-width: 1024px)')

  return {
    isMobile: isMobileBreakpoint,
    isTablet: isTabletBreakpoint,
    isDesktop: isDesktopBreakpoint,
    width: windowSize.width,
    // Classes CSS conditionnelles
    sidebarClass: isMobileBreakpoint ? 'fixed inset-0 z-50' : 'relative',
    sidebarCollapsed: isMobileBreakpoint,
    contentMargin: isMobileBreakpoint ? 'ml-0' : 'ml-72',
    gridCols: isMobileBreakpoint ? 'grid-cols-1' : isTabletBreakpoint ? 'grid-cols-2' : 'grid-cols-3',
    statsGridCols: isMobileBreakpoint ? 'grid-cols-2' : isTabletBreakpoint ? 'grid-cols-3' : 'grid-cols-6',
  }
}
