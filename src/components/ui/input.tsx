import * as React from "react"
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, type, ...props }, ref) => {
    return (
      <div data-input-wrapper className="flex h-10 w-full items-center">
        <span>
          <Icon className="size-5 text-tertiary" />
        </span>
        <input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          type={type}
          className={cn(
            "inline-flex size-full bg-transparent px-3 text-base outline-none placeholder:text-tertiary",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
