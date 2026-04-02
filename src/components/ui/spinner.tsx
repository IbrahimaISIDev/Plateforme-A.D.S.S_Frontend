import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'secondary' | 'white'
}

export function Spinner({ size = 'md', className, color = 'primary' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary-blue',
    white: 'text-white'
  }
  
  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Chargement..."
    >
      <span className="sr-only">Chargement...</span>
    </div>
  )
}

export function LoadingSpinner({ 
  message = "Chargement en cours...",
  size = 'lg',
  className 
}: { 
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}>
      <Spinner size={size} />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  )
}
