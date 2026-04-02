import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}

export function Checkbox({ 
  className, 
  checked, 
  onCheckedChange, 
  indeterminate, 
  disabled,
  ...props 
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        ref={(input) => {
          if (input && indeterminate) {
            input.indeterminate = true;
          }
        }}
        {...props}
      />
    </div>
  );
}
