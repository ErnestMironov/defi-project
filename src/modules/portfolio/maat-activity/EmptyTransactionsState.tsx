import AngelsError from '@assets/lottie/MAAT_Angels_Scales_Error.json'
import { EmptyTransactionsTooltip } from '@components/tooltip/EmptyTransactionsTooltip'
import { cn } from '@utils/cn'
import Lottie from 'lottie-react'
import type { ComponentProps } from 'react'

interface EmptyTransactionsStateProperties extends ComponentProps<'div'> {}

export const EmptyTransactionsState = (props: EmptyTransactionsStateProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('', className)} {...rest}>
      <Lottie
        className="mx-auto size-[15.25rem]"
        animationData={AngelsError}
        loop={false}
      />
      <EmptyTransactionsTooltip className="mt-6" />
    </div>
  )
}
