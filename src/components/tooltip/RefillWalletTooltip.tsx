import Coins from '@assets/icons/buy-crypto.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface RefillWalletTooltipProperties extends ComponentProps<'div'> {}

export const RefillWalletTooltip = (props: RefillWalletTooltipProperties) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'py-4 px-3 rounded-xl bg-[rgba(97,_96,_255,_0.05)] text-text-80 flex items-start gap-[0.38rem]',
        className,
      )}
      {...rest}
    >
      <Coins className="size-6" />
      <p className="text-semi-base/[1.3125rem]">
        Oops... We didn&apos;t manage to find tokens on your wallet
      </p>
    </div>
  )
}
