import StartBold from '@assets/icons/start-bold.svg'

import UserAvatar from '../assets/avatar.png'
import BonusMultiplier from './BonusMultiplier'
import StarPoint from './StarPoint'
import UserPoints from './UserPoints'

interface UserLevelProperties extends React.HTMLAttributes<HTMLDivElement> {}
export default function UserLevel({ className, ...props }: UserLevelProperties) {
  return (
    <div className="relative flex w-full flex-col gap-3 rounded-xl border-[1.5px] border-stroke-100 bg-cards-widget p-6 pb-3 shadow-[0px_6px_36px_0px_rgba(0,0,0,0.09),_0px_6px_9px_0px_rgba(0,0,0,0.04)]">
      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-[6.1875rem] border border-stroke-100 bg-[#8585A90D] px-2 py-1 text-sm">
        <StartBold className="size-4" />
        <span className="text-main-100">512</span>
        <span className="text-main-50">/ 1000</span>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={UserAvatar}
          alt="user avatar"
          className="size-12 rounded-full bg-red-100"
        />
        <p className="text-2xl text-text-2100">Giga Muckle</p>
        <p className="text-2xl text-text-5070">Next</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-md bg-[#8585A90D] px-2 py-1 text-sm">
          <p className="text-sm text-text-2100">LVL 2</p>
        </div>
        <BonusMultiplier multiplier={1.5} />

        <StarPoint value={1000} />
        <UserPoints value={100} />
      </div>
    </div>
  )
}
