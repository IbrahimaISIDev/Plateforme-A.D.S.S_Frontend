import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-t-md border-b-2 border-border bg-surface-container-low px-3 py-2 text-base transition-all outline-none placeholder:text-muted-foreground focus-visible:border-secondary-container focus-visible:bg-surface-container-lowest disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
