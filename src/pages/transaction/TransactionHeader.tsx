import type { Action } from '@api/maat-finance/types'
import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import TagRight from '@assets/icons/tag-right.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Skeleton } from '@components/ui/skeleton'
import { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import type { Address } from 'viem'

interface TransactionHeaderProperties extends ComponentProps<'div'> {
  isLoading?: boolean
  data?: Action
}

export const TransactionHeader = (props: TransactionHeaderProperties) => {
  const { className, isLoading, data, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) {
    return <TransactionHeaderMobile {...props} />
  }

  return (
    <div className={cn('mt-[4.5rem] flex', className)} {...rest}>
      <TagRight className="size-10" />
      <div className="ml-4 flex flex-col gap-3">
        <h2 className="text-2.5xl/[2.1rem] uppercase">
          {data?.action_type && !isLoading ? (
            LAST_EVENT_ACTION_TYPE[data.action_type]
          ) : (
            <Skeleton className="h-10 w-60 bg-stroke-100 dark:bg-stroke-100" />
          )}
        </h2>
        {isLoading ? (
          <Skeleton className="h-6 w-40 bg-stroke-100 dark:bg-stroke-100" />
        ) : (
          <p className="flex items-center text-xl/[1.925rem] text-gray-100">
            Intention ID {shortenAddress(data?.intention_id ?? '')}
            <CopyButton className="ml-3 inline-block" text={data?.intention_id ?? ''} />
          </p>
        )}
      </div>
    </div>
  )
}

export const TransactionHeaderMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  return (
    <div className={cn('mt-8', className)} {...rest}>
      <div className="flex items-start gap-4">
        <TagRight className="size-7" />
        <h2 className="text-2xl uppercase">
          {data?.[0]?.action_type ? LAST_EVENT_ACTION_TYPE[data?.[0]?.action_type] : ''}
        </h2>
      </div>
      <p className="mt-3 flex items-center text-base text-gray-100">
        Intention ID {shortenAddress(data?.[0]?.intention_id ?? '')}
        <CopyButton className="ml-3 inline-block" text={data?.[0]?.intention_id ?? ''} />
      </p>
    </div>
  )
}
