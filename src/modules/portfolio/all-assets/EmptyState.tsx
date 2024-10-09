import AngelsError from '@assets/lottie/MAAT_Angels_Scales_Error.json'
import { RefillWalletTooltip } from '@components/tooltip/RefillWalletTooltip'
import { cn } from '@utils/cn'
import Lottie from 'lottie-react'
import type { ComponentProps } from 'react'

interface EmptyStateProperties extends ComponentProps<'div'> {}

export const EmptyState = (props: EmptyStateProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('', className)} {...rest}>
      <Lottie
        className="mx-auto size-[15.25rem]"
        animationData={AngelsError}
        loop={false}
      />
      <RefillWalletTooltip className="mt-6" />
    </div>
  )
}
