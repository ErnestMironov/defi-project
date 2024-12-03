import type { Event } from '@api/maat-finance/types'
import LinkIcon from '@assets/icons/externalLinkIcon.svg'
import TransactionDetails from '@assets/icons/TransactionDetails.svg'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Skeleton } from '@components/ui/skeleton'
import { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
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
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-xl border p-2 text-gray-700 hover:bg-gray-200">
        <span className="size-full shadow-test">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M8.29167 8.66536C8.65986 8.66536 8.95833 8.36689 8.95833 7.9987C8.95833 7.63051 8.65986 7.33203 8.29167 7.33203C7.92348 7.33203 7.625 7.63051 7.625 7.9987C7.625 8.36689 7.92348 8.66536 8.29167 8.66536Z"
              stroke="#8585A9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.29167 4.0013C8.65986 4.0013 8.95833 3.70283 8.95833 3.33464C8.95833 2.96645 8.65986 2.66797 8.29167 2.66797C7.92348 2.66797 7.625 2.96645 7.625 3.33464C7.625 3.70283 7.92348 4.0013 8.29167 4.0013Z"
              stroke="#8585A9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.29167 13.3333C8.65986 13.3333 8.95833 13.0349 8.95833 12.6667C8.95833 12.2985 8.65986 12 8.29167 12C7.92348 12 7.625 12.2985 7.625 12.6667C7.625 13.0349 7.92348 13.3333 8.29167 13.3333Z"
              stroke="#8585A9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mr-2 mt-4 w-[248px]  rounded-xl border border-stroke-40100 bg-cards p-2 shadow-[0px_6px_66px_0px_rgba(0,0,0,0.06),0px_6px_9px_0px_rgba(0,0,0,0.04)]"
        side="left"
        align="end"
      >
        <DropdownMenu.Item className="cursor-pointer rounded-xl bg-cards p-4 hover:bg-light-blue-15">
          <Link
            to={`${ROUTES.TRANSACTIONS}/${event.hash}`}
            className="flex w-full items-center gap-4"
          >
            <TransactionDetails className="size-5" />
            <p className="text-base text-text-1100">Transaction Details</p>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer rounded-xl p-4 hover:bg-light-blue-15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LinkIcon className="size-5" />
              <p className="ml-1 text-base">Etherscan</p>
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

  return (
    <div className={cn('flex items-center', className)} {...rest}>
      <div
        className={cn(
          'relative flex size-14 items-center justify-center rounded-xl bg-main-15',
          event.action_type === 'DEPOSIT' && 'bg-red-15',
        )}
      >
        <div
          className={cn('size-10', event.status === 'failed' && '[&_path]:fill-red-50')}
        >
          {renderIcon()}
        </div>
      </div>
      <div className="ml-3 space-y-1">
        <div className="flex items-center">
          <p className="text-text text-[1.25rem]/[1.5rem] font-medium">
            {
              LAST_EVENT_ACTION_TYPE[
                event.action_type as keyof typeof LAST_EVENT_ACTION_TYPE
              ]
            }
          </p>
          {/* <Link to={`${ROUTES.TRANSACTIONS}/${event.hash}`} className="ml-[0.38rem]">
            <Expand className="size-6" />
          </Link>
          <ScanLink
            chainId={event.src_chain_id}
            txHash={event.hash}
            className="ml-1 size-6"
          /> */}
        </div>
        <p className="text-base text-gray-100">
          <p className="text-base font-medium">
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
          {/*  */}
        </p>
      </div>
      <div className="ml-auto space-y-1">
        <div className="flex items-center gap-[0.38rem]">
          <span className="text-sm text-gray-100">
            {getShortFromNow(event.creation_time)}
          </span>
          <StatusLabel status={event.status} />
          <DropdownMenuForPortfolio event={event} />
        </div>
        {/* <p className="text-end text-base text-gray-100">
          {formatUsdValue(
            formatUnits(BigInt(event.amount ?? 0), event.vault.token.decimals),
            {
              notation: 'compact',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}
        </p> */}
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
