"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div
        data-input-wrapper
        className="relative flex h-10 w-full items-center"
      >
        <span>
          <Icon className="size-5 text-tertiary" />
        </span>
        <input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          type={showPassword ? "text" : "password"}
          className={cn(
            "inline-flex size-full bg-transparent px-3 pr-10 text-base outline-none placeholder:text-tertiary",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
          onClick={() => setShowPassword((prev) => !prev)}
          // disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeOffIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
