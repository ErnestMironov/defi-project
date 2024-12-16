import { useGetUserPoints } from '@api/maat-finance/useGetUserPoints'
import PlusIcon from '@assets/icons/plus.svg'
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
        'flex h-[3rem]  rounded-[1rem] bg-white border border-stroke-100 dark:bg-cards-widget dark:border-stroke-40100',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1.5 rounded-l-2xl border-r border-stroke-40100 px-4 py-3 ">
        <PointIcon className="size-4 text-[#7B61FF]" />
        <span className="text-sm font-medium leading-[1.5625rem] text-main-100">
          {userPoints?.totalRewards || 0}
        </span>
      </div>

      <button
        className="flex items-center justify-center rounded-r-2xl bg-white px-3 transition-colors dark:border-stroke-40100 dark:bg-cards-widget"
        type="button"
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  )
}
