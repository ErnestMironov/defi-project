import Planet from '@assets/icons/planet.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyInfoProperties extends ComponentProps<'div'> {}

export const StrategyInfo = (props: StrategyInfoProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  return (
    <div
      className={cn(
        'mt-12 grid grid-flow-col grid-cols-[20rem_1fr_28.5625rem] grid-rows-2 gap-4 *:rounded-2xl *:bg-cards *:px-6 *:py-4 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-[0.62rem]">
        <h6 className="text-lg text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-3xl">
          {formatUsdValue(567.83)}
          <span className="text-lg text-main-80">
            {formatPercentValue(15.72, { signDisplay: 'exceptZero' })}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.62rem]">
        <h6 className="text-lg text-gray-100">APY</h6>
        <p className="flex items-start gap-2 text-3xl">
          {formatPercentValue(384)}
          <span className="text-lg text-main-80">
            {formatPercentValue(15.72, { signDisplay: 'exceptZero' })}
          </span>
        </p>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Protocol Info</h6>
        <p className="text-lg text-text-80">
          Lorem ipsum dolor sit amet consectetur. Feugiat lectus elementum faucibus odio
          vel mus. Libero euismod quis lobortis aliquam semper felis id. In nulla congue
          non arcu ipsum ultrices ultrices. Sed nisi ut pulvinar tincidunt blandit nisl
          nisl.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-2 text-lg/[1.35rem] text-text">
            <span>{shortenString(id ?? '', 7)}</span>
            <CopyButton text={id ?? ''} />
          </div>
        </div>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Strategy Info</h6>
        <p className="text-lg text-text-80">
          Lorem ipsum dolor sit amet consectetur. Congue morbi suspendisse mattis
          malesuada. Tempus eget sapien adipiscing eget pulvinar
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-100">Link to protocol</p>
          <p className="flex items-center gap-2 text-lg text-text">
            <Planet className="size-6" />
            <span>suspxvcendisse.rew</span>
          </p>
        </div>
      </div>
    </div>
  )
}
