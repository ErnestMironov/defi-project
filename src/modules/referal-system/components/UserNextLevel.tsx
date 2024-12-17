import type { NextLevel, UserRewards } from '@api/maat-finance/types'
import StartBold from '@assets/icons/start-bold.svg'
import UserAvatar from '@assets/images/userAvatar.svg'
import { cn } from '@utils/cn'

import BonusMultiplier from './BonusMultiplier'
import StarPoint from './StarPoint'
import UserPoints from './UserPoints'

interface UserNextLevelProperties extends React.HTMLAttributes<HTMLDivElement> {
  nextLevel: NextLevel | undefined
  userRewards: UserRewards | undefined
}
export default function UserNextLevel({
  className,
  nextLevel,
  userRewards,
  ...props
}: UserNextLevelProperties) {
  const pointsNeededForNextLevel =
    (nextLevel?.pointsToNextLevel ?? 0) + (userRewards?.totalPoints ?? 0)

  const remainingPointsPercentage =
    100 -
    ((pointsNeededForNextLevel - (userRewards?.totalPoints ?? 0)) * 100) /
      pointsNeededForNextLevel

  return (
    <div className="relative">
      <div
        className="absolute left-0 top-0 z-10 h-full rounded-l-3xl bg-[#8585A914] transition-all duration-300"
        style={{
          width: `${remainingPointsPercentage}%`,
        }}
      />
      <div
        className={cn(
          'relative flex w-full flex-col z-11 gap-3 max-md:gap-4 rounded-3xl border-[1.5px] border-stroke-100 bg-cards-widget p-6 pb-3 shadow-[0px_6px_36px_0px_rgba(0,0,0,0.09),_0px_6px_9px_0px_rgba(0,0,0,0.04)] max-md:border-none',
          className,
        )}
        {...props}
      >
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-[6.1875rem] border border-stroke-100 bg-[#8585A90D] px-2 py-1 text-sm max-md:hidden">
          <StartBold className="size-4" />
          <span className="text-main-100">{userRewards?.totalPoints}</span>
          <span className="text-main-50">/ {pointsNeededForNextLevel}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserAvatar className="size-12 rounded-full bg-red-100" />
          <p className="text-2xl text-text-2100">{nextLevel?.name}</p>
          <p className="text-2xl text-text-5070 max-md:text-[1rem]">Next</p>
        </div>

        <div className="max-md:flex-start flex items-center gap-2 max-md:flex-wrap max-md:items-start max-md:justify-start">
          <div className="rounded-md bg-violet-15 px-2 py-1 text-sm max-md:flex max-md:items-center max-md:justify-center">
            <p className="text-sm text-violet-100">
              LVL {nextLevel?.nextLvlBenefits?.benefitsDescription?.level}
            </p>
          </div>
          <BonusMultiplier
            multiplier={nextLevel?.nextLvlBenefits?.globalRewardMultiplier ?? 0}
          />
          <UserPoints value={nextLevel?.nextLvlBenefits.rewardsFromReferrals ?? 0} />
          <StarPoint value={nextLevel?.nextLvlBenefits.initialBonus ?? 0} />

          <div className="hidden h-auto items-center gap-1 rounded-[6.1875rem] border border-stroke-100 bg-[#8585A90D] px-2 py-1 text-sm max-md:flex max-md:py-1">
            <StartBold className="size-4" />
            <span className="text-main-100">{userRewards?.totalPoints}</span>
            <span className="text-main-50">/ {pointsNeededForNextLevel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
