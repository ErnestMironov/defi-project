import Check from '@assets/icons/check.svg'
import ArrowDown from '@assets/icons/curve-arrow-down.svg'
import lottieLoader from '@assets/lottie/deposit-steps-loader.json'
import { cn } from '@utils/cn'
import Lottie from 'lottie-react'
import type { ReactNode } from 'react'

import type { STEP_STATUS } from '../interfaces'

interface IWizardStepProperties {
  icon: ReactNode
  title: string
  showArrow?: boolean
  activeStep?: boolean
  status?: STEP_STATUS
  error?: string | null
}

export const WizardStep = ({
  icon,
  title,
  showArrow = false,
  status,
  activeStep,
  error,
}: IWizardStepProperties) => {
  return (
    <>
      {showArrow && <ArrowDown className="h-[1.125rem] w-8" />}
      <div className="flex items-center gap-4">
        <div
          className={cn({
            'opacity-15': !activeStep && status !== 'success',
          })}
        >
          {icon}
        </div>
        <p className="flex items-center text-[1.125rem]">
          <span
            className={cn(
              status === 'error' && 'text-red-100',
              !activeStep && 'text-gray-80',
              status === 'success' && 'text-[#58CDAD]',
            )}
          >
            {title}
          </span>
          {status === 'pending' && (
            <div className="relative flex size-8 items-center justify-center overflow-hidden">
              <Lottie
                className="absolute size-16 [&>svg]:size-full"
                animationData={lottieLoader}
                loop
              />
            </div>
          )}
          {status === 'success' ? (
            <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
          ) : null}
          {status === 'error' && (
            <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
              {error?.slice(0, 30)}...
            </div>
          )}
        </p>
      </div>
    </>
  )
}
