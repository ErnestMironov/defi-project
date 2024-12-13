import { cn } from '@utils/cn'
import { ReactNode } from 'react'

interface InputWrapperProps {
  title?: string
  children: ReactNode
  className?: string
  validationError?: string
}

export const InputWrapper = ({
  title,
  children,
  className,
  validationError,
}: InputWrapperProps) => {
  return (
    <div className={cn('w-full', className)}>
      {title && (
        <span className="font-aeonik text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
          {title}
        </span>
      )}
      <div
        className={cn(
          'bg-input-default dark:bg-input-active rounded-xl p-4',
          validationError && 'bg-input-error',
        )}
      >
        {children}
      </div>
    </div>
  )
} 