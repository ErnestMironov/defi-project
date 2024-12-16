import type { IncentiveEvent } from '@api/maat-finance/types'
import CheckSquare from '@assets/icons/check-square.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { INCENTIVE_ACTION_TYPE } from '@constants/action-type'
import { shortenAddress } from '@utils/transform'

interface IncentiveActionTypeComponentProperties {
  event: IncentiveEvent
}

export const IncentiveActionTypeComponent = (
  props: IncentiveActionTypeComponentProperties,
) => {
  const { event } = props
  return (
    <div className="flex items-center gap-4 max-lg:gap-2 max-lg:text-sm">
      <CheckSquare className="size-8 shrink-0" />
      <div>
        <div className="flex items-center gap-[0.38rem]">
          <p className="leading-6">
            {
              INCENTIVE_ACTION_TYPE[
                event.action_type as keyof typeof INCENTIVE_ACTION_TYPE
              ]
            }
          </p>
          <ScanLink
            chainId={event.src_chain_id}
            txHash={event.hash}
            className="size-4 shrink-0 max-lg:hidden"
          />
        </div>

        <div className="flex items-center gap-[0.38rem]">
          <p className="text-text-260">{shortenAddress(event.hash)}</p>
          <CopyButton text={event.hash} />
        </div>
      </div>
    </div>
  )
}
