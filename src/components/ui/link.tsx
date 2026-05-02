"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors",
  {
    variants: {
      variant: {
        default: "text-accent underline underline-offset-4 hover:text-background",
        nav: "px-3 py-2 rounded-lg text-base font-medium text-accent hover:text-background",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-30",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
)

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean
  disabled?: boolean
}

function Link({
  className,
  variant,
  disabled = false,
  external = false,
  children,
  href,
  ...props
}: LinkProps) {
  return (
    <a
      href={disabled ? undefined : href}
      target={external && !disabled ? "_blank" : undefined}
      rel={external && !disabled ? "noopener noreferrer" : undefined}
      aria-disabled={disabled}
      className={cn(linkVariants({ variant, disabled }), className)}
      {...props}
    >
      {children}
      {external && !disabled && <ArrowUpRight className="size-4 shrink-0" />}
    </a>
  )
}

export { Link, linkVariants }