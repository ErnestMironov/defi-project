import ETH from '@assets/icons/tokens/eth.svg'
import USDC from '@assets/icons/tokens/usdc.svg'
import USDT from '@assets/icons/tokens/usdt.svg'
import { RefillWalletTooltip } from '@components/tooltip/RefillWalletTooltip'
import type { ComponentProps } from 'react'

interface EmptyStateProperties extends ComponentProps<'div'> {}

export const EmptyState = (props: EmptyStateProperties) => {
  const { className, ...rest } = props
  return (
    <div className={className} {...rest}>
      <div className="mt-4 flex items-center justify-center">
        <div className="relative flex items-center ">
          <USDC className="absolute left-0 size-12 -translate-x-8 overflow-hidden rounded-full opacity-50" />
          <ETH className="z-10 size-16 overflow-hidden rounded-full border-2 border-cards-widget" />
          <USDT className="absolute right-0 size-12 translate-x-8 overflow-hidden rounded-full opacity-50" />
        </div>
      </div>
      <RefillWalletTooltip className="mt-5" />
    </div>
  )
}
