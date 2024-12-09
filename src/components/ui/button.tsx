import TryAgainIcon from '@assets/icons/try-again.svg'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium uppercase ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 max-lg:text-center',
  {
    variants: {
      variant: {
        default:
          'bg-main-100 text-white hover:bg-blue1 disabled:bg-text-5 disabled:text-text-dark/30',
        light:
          'hover:bg-light-blue-40 bg-light-blue-30 text-dark-blue-100 disabled:bg-light-blue-30',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-main-100 bg-transparent text-main-100 hover:border-blue1 hover:text-blue1',
        'outline-light':
          'border border-light-blue-100 bg-transparent text-light-blue-100 hover:border-blue1 hover:text-blue1',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        container:
          'text-text bg-cards hover:bg-cards-hover disabled:bg-cards dark:bg-cards-hover dark:hover:bg-cards',
        error: 'bg-red-5 text-red-100 hover:bg-red-15 disabled:bg-red-5',
      },
      size: {
        default:
          'h-auto rounded-2xl px-12 py-5 text-[1.25rem] font-bold uppercase leading-[120%]',
        sm: 'h-9 rounded-md px-3',
        lg: 'rounded-xl px-9 py-6 text-lg max-lg:py-[0.91rem] max-lg:text-base',
        icon: 'size-12 rounded-xl p-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  error?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      error = false,
      children,
      ...props
    },
    reference,
  ) => {
    const Comp = asChild ? Slot : 'button'

    const buttonVariant = error ? 'error' : variant
    const buttonContent = loading ? 'Pending' : children

    return (
      <Comp
        className={cn(buttonVariants({ variant: buttonVariant, size, className }), {
          'opacity-50 pointer-events-none': loading,
        })}
        ref={reference}
        {...props}
      >
        {buttonContent}
        {error && <TryAgainIcon className="ml-2 size-4" />}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
