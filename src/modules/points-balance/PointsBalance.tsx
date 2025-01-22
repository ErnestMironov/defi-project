import { useGetUserBadges } from '@api/maat-finance/refferal-system/useGetUserBadges'
import PlusIcon from '@assets/icons/plus.svg'
import PointIcon from '@assets/icons/point-icon.svg'
import { cn } from '@utils/cn'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

export const PointsBalance = ({ className }: { className?: string }) => {
  const { address } = useAccount()
  const { data: badgesInfo } = useGetUserBadges(address as Address)

  return (
    <div
      className={cn(
        'flex h-[3rem] max-md:h-[2.5rem] max-md:w-auto shadow-test-2 rounded-[1rem] max-md:rounded-[0.75rem] bg-white border border-stroke-100 dark:bg-cards-widget dark:border-stroke-40100',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-l-2xl border-r border-stroke-40100 px-4 py-3 max-md:px-3 max-md:py-2">
        <PointIcon className="size-4 text-[#7B61FF]" />
        <span className="text-sm font-medium leading-[1.5625rem] text-main-100 max-md:text-[0.8125rem] ">
          {Math.round(badgesInfo?.userRewards.totalPoints || 0)}
        </span>
      </div>

      <button
        className="flex items-center justify-center rounded-r-2xl bg-white px-3 transition-colors dark:border-stroke-40100 dark:bg-cards-widget max-md:px-2"
        type="button"
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  )
}
