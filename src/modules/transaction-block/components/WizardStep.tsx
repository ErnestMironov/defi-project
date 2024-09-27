import Check from '@assets/icons/check.svg'
import DashLine from '@assets/icons/dash-line.svg'
import { cn } from '@utils/cn'
import type { ReactNode } from 'react'

import type { STEP_STATUS } from '../deposit/interfaces'

interface IWizardStepProperties {
  icon: ReactNode
  title: string
  showChain?: boolean
  stepNumber?: number
  maxStepNumber?: number
  status?: STEP_STATUS
}

export const WizardStep = ({
  icon,
  title,
  showChain = false,
  status,
  stepNumber,
  maxStepNumber,
}: IWizardStepProperties) => {
  return (
    <div>
      <div
        style={{
          transition: 'max-height 0.3s ease-in-out',
          maxHeight: showChain ? '1.8125rem' : '0',
          overflow: 'hidden',
        }}
      >
        <DashLine className="ml-5 h-[1.8125rem]" />
      </div>
      <div className="flex items-center gap-4">
        <div className={cn('flex size-[2.625rem] items-center justify-center')}>
          {icon}
        </div>
        <div>
          {stepNumber && (
            <div className="text-[0.875rem] leading-4 text-text-dark opacity-40">
              Step {`${stepNumber} of ${maxStepNumber}`}
            </div>
          )}
          <p className="flex items-center text-[1.125rem]">
            <span
              className={cn(
                status === 'error' && 'text-red-100',
                status === 'success' && 'opacity-50',
              )}
            >
              {title}
            </span>
            {status === 'success' ? (
              <Check className="[&_path]:stroke-main ml-2 size-6 overflow-visible" />
            ) : null}
          </p>
        </div>
      </div>
    </div>
  )
}
