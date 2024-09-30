import Check from '@assets/icons/check.svg'
import { cn } from '@utils/cn'
import type { ReactNode } from 'react'

import type { STEP_STATUS } from '../deposit/interfaces'

interface IWizardStepProperties {
  icon: ReactNode
  title: string
  stepNumber?: number
  maxStepNumber?: number
  status?: STEP_STATUS
  isDDOpen?: boolean
}

export const WizardStep = ({
  icon,
  title,
  status,
  stepNumber,
  maxStepNumber,
  isDDOpen,
}: IWizardStepProperties) => {
  return (
    <div
      className="flex items-center gap-3 transition-all duration-300"
      style={{
        marginTop: stepNumber === 1 || !isDDOpen ? '0' : '1.5rem',
      }}
    >
      <div className={cn('flex size-[2.625rem] items-center justify-center')}>{icon}</div>
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
  )
}
