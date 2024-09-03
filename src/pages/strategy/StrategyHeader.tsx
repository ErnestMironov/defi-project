import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyHeaderProperties extends ComponentProps<'div'> {}

export const StrategyHeader = (props: StrategyHeaderProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  return (
    <div
      className={cn(
        'mt-10 flex items-center max-lg:items-start gap-8 max-lg:gap-2',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center -space-x-3 *:size-7 max-lg:-space-x-1.5">
        <TokenIconComponent symbol="USDC" />
        <TokenIconComponent symbol="Arbitrum" />
        <TokenIconComponent symbol="Spark" />
      </div>
      <div className="justify-center space-y-3">
        <h1 className="text-[2rem]/[2.4rem] max-lg:text-2xl">USDC / Arbitrum / Spark</h1>
        <div className="flex items-center gap-2">
          <p className="text-lg text-gray-100 max-lg:text-base">
            Address {shortenString(id ?? '', 7)}
          </p>
          <Scan className="size-5" />
          <CopyButton text={id ?? ''} />
        </div>
      </div>
    </div>
  )
}
