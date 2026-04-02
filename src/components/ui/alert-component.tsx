import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export function Alert({ className, variant = 'default', children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4',
        {
          'bg-white text-gray-800 border-gray-200': variant === 'default',
          'bg-red-50 text-red-800 border-red-200': variant === 'destructive'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-sm', className)}
      {...props}
    />
  );
}
