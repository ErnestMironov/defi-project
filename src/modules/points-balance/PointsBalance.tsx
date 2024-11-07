import { useGetUserPoints } from '@api/maat-finance/useGetUserPoints'
import PointIcon from '@assets/icons/point-icon.svg'
import { cn } from '@utils/cn'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

export const PointsBalance = ({ className }: { className?: string }) => {
  const account = useAccount()
  const { data: userPoints } = useGetUserPoints(account.address as Address)

  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-center rounded-[12.5rem] bg-cards-widget px-6 py-4 text-[1.25rem] leading-none tracking-[-0.0125rem] text-gray-80 dark:bg-[rgba(153,_152,_184,_0.10)]',
        className,
      )}
    >
      Your balance:
      <span className="ml-1 mr-[.38rem] text-main-100 dark:text-white">
        {userPoints?.totalRewards}
      </span>
      <PointIcon className="relative -top-0.5 size-6" />
    </div>
  )
}
