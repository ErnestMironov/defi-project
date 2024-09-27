import { cn } from '@utils/cn'
import { ChevronDownIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Children } from 'react'

interface IWizardDropDownProperties {
  children: ReactNode
  className?: string
  open: boolean
  activeStep: number
  setOpen: (open: boolean) => void
}

export const WizardDropDown = ({
  children,
  className,
  open,
  activeStep,
  setOpen,
}: IWizardDropDownProperties) => {
  const childrenArray = Children.toArray(children)

  return (
    <div
      className={cn('flex justify-between cursor-pointer', className)}
      onClick={() => setOpen(!open)}
    >
      <div className="flex flex-col">
        {childrenArray.map((child, index) => (
          <div
            key={index}
            style={{
              transition: 'max-height 0.3s ease-in-out',
              maxHeight: open || index + 1 === activeStep ? '5rem' : '0',
              overflow: 'hidden',
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <ChevronDownIcon
        className={cn(
          'size-6 transition-transform stroke-[#6160FF] [stroke-opacity:0.5] mt-3',
          open ? 'rotate-180' : '',
        )}
      />
    </div>
  )
}
