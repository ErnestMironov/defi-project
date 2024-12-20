import type { Event } from '@api/maat-finance/types'
import LinkIcon from '@assets/icons/externalLinkIcon.svg'
import MoreOptionsIcon from '@assets/icons/more-options.svg'
import TransactionDetails from '@assets/icons/TransactionDetails.svg'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Skeleton } from '@components/ui/skeleton'
import { LAST_EVENT_ACTION_TYPE_FOR_PORTFOLIO } from '@constants/action-type'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getShortFromNow } from '@utils/get-day-difference'
import { type ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { formatUnits } from 'viem'

import BlueBackground from '../assets/icons/background/blue.svg'
import PurpleBackground from '../assets/icons/background/purple.svg'
import BridgeIcon from '../assets/icons/bridge.svg'
import DepositIcon from '../assets/icons/deposit.svg'
import WithdrawIcon from '../assets/icons/portfolioWithdraw.svg'
import RebalanceIcon from '../assets/icons/rebalance.svg'
import { StatusLabel } from '../components/StatusLabel'

interface UserTransactionItemProperties extends ComponentProps<'div'> {
  event: Event
}

export const STATUS_MAP = {
  completed: 'completed',
  'in progress': 'Pending',
  failed: 'Failed',
} as const

const DropdownMenuForPortfolio: React.FC<UserTransactionItemProperties> = (props) => {
  const { event } = props
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-xl border p-2 text-gray-700 hover:bg-gray-200">
        <MoreOptionsIcon className="size-full" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mr-2 mt-4 w-[15.75rem] gap-1 rounded-xl border border-stroke-100 bg-cards p-1 shadow-test-2"
        side="left"
        align="end"
      >
        <DropdownMenu.Item className="cursor-pointer rounded-xl bg-cards p-4 hover:bg-light-blue-15">
          <Link
            to={`${ROUTES.TRANSACTIONS}/${event.hash}`}
            className="flex w-full items-center gap-4"
            target={isMobile ? '_blank' : '_self'}
          >
            <TransactionDetails className="size-5" />
            <p className="text-sm text-text-1100">Transaction Details</p>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer rounded-xl p-4 hover:bg-light-blue-15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LinkIcon className="size-5" />
              <p className="ml-1 text-sm">View on scanner</p>
            </div>
            <ScanLink chainId={event.src_chain_id} txHash={event.hash} className="ml-1" />
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export const UserTransactionItem = (props: UserTransactionItemProperties) => {
  const { event, className, ...rest } = props

  console.log(event)

  const renderIcon = () => {
    switch (event.action_type) {
      case 'DEPOSIT': {
        return (
          <DepositIcon className="size-full [&_path:first-child]:stroke-red-100 [&_path]:fill-red-100" />
        )
      }
      case 'WITHDRAW':
      case 'WITHDRAW_REQUEST': {
        return (
          <div className="relative size-full">
            <BlueBackground className="absolute inset-0 size-full" />
            <WithdrawIcon className="absolute inset-0 m-auto size-4" />
          </div>
        )
      }
      case 'BRIDGE': {
        return (
          <div className="relative size-full">
            <PurpleBackground className="absolute inset-0 size-full" />
            <BridgeIcon className="absolute inset-0 m-auto size-4" />
          </div>
        )
      }
      case 'REBALANCE': {
        return (
          <div className="relative size-full">
            <BlueBackground className="absolute inset-0 size-full" />
            <RebalanceIcon className="absolute inset-0 m-auto size-4" />
          </div>
        )
      }
      default: {
        return null
      }
    }
  }

  const formatTransactionAction = (action: string) => {
    if (!action) return null

    const words = action.split(' ')

    return (
      <>
        <span className="text-text-1100">{words[0]}</span>
        <span className="text-text-60">{` ${words.slice(1).join(' ')}`}</span>
      </>
    )
  }

  const renderAmount = () => {
    if (typeof event.vault === 'string') {
      return (
        <p className="text-base font-medium max-lg:text-sm">
          {formatAmount(event.amount ?? 0, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {event.vault}
        </p>
      )
    }

    return (
      <p className="text-base font-medium max-lg:text-sm">
        {formatAmount(
          formatUnits(BigInt(event.amount ?? 0), event.vault.token.decimals),
          {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )}{' '}
        {event.vault.token.symbol}
      </p>
    )
  }

  return (
    <div className={cn('flex items-center', className)} {...rest}>
      <div
        className={cn(
          'relative flex size-14 items-center justify-center rounded-xl bg-main-15 max-lg:size-10',
          event.action_type === 'DEPOSIT' && 'bg-red-15',
        )}
      >
        <div
          className={cn(
            'size-10 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center',
            event.status === 'failed' && '[&_path]:fill-red-50',
          )}
        >
          {renderIcon()}
        </div>
      </div>
      <div className="ml-3 space-y-1">
        <div className="flex items-center">
          <p className=" text-[1.25rem]/[1.5rem] font-medium leading-4 max-lg:text-sm">
            {formatTransactionAction(
              LAST_EVENT_ACTION_TYPE_FOR_PORTFOLIO[
                event.action_type as keyof typeof LAST_EVENT_ACTION_TYPE_FOR_PORTFOLIO
              ],
            )}
          </p>
        </div>
        <p className="text-base text-text-2100">{renderAmount()}</p>
      </div>
      <div className="ml-auto space-y-1">
        <div className="flex items-center gap-[0.38rem]">
          {event.status !== 'in progress' && (
            <span className="text-sm text-text-2100">
              {getShortFromNow(event.creation_time)}
            </span>
          )}
          <StatusLabel status={event.status} />
          <DropdownMenuForPortfolio event={event} />
        </div>
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
