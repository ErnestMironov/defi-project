import type { Event } from '@api/maat-finance/types'
import Expand from '@assets/icons/expand-with-bg.svg'
import LinkWithBrackets from '@assets/icons/link-with-bracket.svg'
import { ScanLink } from '@components/scan-link/ScanLink'
import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import dayjs from 'dayjs'
import { type ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { formatUnits } from 'viem'

import DepositIcon from '../assets/icons/deposit.svg'
import WithdrawIcon from '../assets/icons/withdraw.svg'

interface UserTransactionItemProperties extends ComponentProps<'div'> {
  event: Event
}

export const STATUS_MAP = {
  success: 'Success',
  'in progress': 'Pending',
  failed: 'Failed',
} as const

export const UserTransactionItem = (props: UserTransactionItemProperties) => {
  const { event, className, ...rest } = props

  const renderIcon = () => {
    switch (event.action_type) {
      case 'DEPOSIT': {
        return <DepositIcon className="size-full" />
      }
      case 'WITHDRAW': {
        return <WithdrawIcon className="size-full" />
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className={cn('flex items-center', className)} {...rest}>
      <div
        className={cn(
          'relative flex size-9 items-center justify-center rounded-full bg-gray-20',
          event.status === 'failed' && 'outline outline-red-50 bg-input-error',
        )}
      >
        <div
          className={cn(
            'size-5 [&_path]:fill-gray-80',
            event.status === 'failed' && '[&_path]:fill-red-50',
          )}
        >
          {renderIcon()}
        </div>
        <TokenIconComponent
          symbol={event.src_chain_id}
          className="absolute bottom-0 right-0 size-3 rounded-full outline outline-[1.5px] outline-white"
        />
      </div>
      <div className="ml-3 space-y-1">
        <div className="flex items-center">
          <p className="text-[1.25rem]/[1.5rem] font-medium text-text">
            {
              LAST_EVENT_ACTION_TYPE[
                event.action_type as keyof typeof LAST_EVENT_ACTION_TYPE
              ]
            }
          </p>
          <Link to={`${ROUTES.TRANSACTIONS}/${event.hash}`} className="ml-[0.38rem]">
            <Expand className="size-6" />
          </Link>
          <ScanLink
            chainId={event.src_chain_id}
            txHash={event.hash}
            className="ml-1 size-6"
          >
            <LinkWithBrackets className="size-full" />
          </ScanLink>
        </div>
        <p className="text-base text-gray-100">
          {dayjs(event.creation_time).format('DD/MM/YY HH:mm')}
          <span
            className={cn(
              'ml-2 text-gray-100',
              event.status === 'success' && 'text-green-100',
              event.status === 'failed' && 'text-red-100',
              event.status === 'in progress' && 'text-dark-blue-100',
            )}
          >
            {STATUS_MAP[event.status as keyof typeof STATUS_MAP]}
          </span>
        </p>
      </div>
      <div className="ml-auto space-y-1">
        <div className="flex items-center gap-[0.38rem]">
          <TokenIconComponent
            symbol={event.vault.token.symbol}
            className="size-[1.125rem]"
          />
          <p className="text-[1.25rem]/[1.5rem] font-medium">
            {formatAmount(
              formatUnits(BigInt(event.amount ?? 0), event.vault.token.decimals),
              {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </p>
        </div>
        <p className="text-end text-base text-gray-100">
          {formatUsdValue(
            formatUnits(BigInt(event.amount ?? 0), event.vault.token.decimals),
            {
              notation: 'compact',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}
        </p>
      </div>
    </div>
  )
}

export const UserTransactionItemSkeleton = () => (
  <div className="flex items-center">
    <Skeleton
      className={cn(
        'relative flex size-9 items-center justify-center rounded-full shrink-0',
      )}
    />
    <div className="ml-3 space-y-1">
      <div className="flex items-center">
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-[1.2rem] w-20" />
    </div>
    <div className="ml-auto space-y-1">
      <div className="flex items-center gap-[0.38rem]">
        <Skeleton className="size-[1.125rem] rounded-full" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="ml-auto h-[1.2rem] w-16" />
    </div>
  </div>
)
