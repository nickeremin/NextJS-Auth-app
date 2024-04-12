import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  `relative inline-flex items-center justify-center font-medium transition select-none outline-none 
    disabled:cursor-not-allowed`,
  {
    variants: {
      variant: {
        default:
          "bg-cyan-600 text-white hover:bg-cyan-600/80 disabled:hover:bg-cyan-600",
        ghost:
          "bg-transparent text-tertiary hover:bg-cyan-500/40 hover:text-primary disabled:bg-transparent disabled:text-tertiary",
      },
      size: {
        default: "h-9 px-4 rounded-md text-sm",
        lg: "h-14 rounded-full px-6 text-base",
        icon: "size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
