import { cn } from '@utils/cn'

import UserAvatar from '../assets/avatar.png'
import LeaderBoard from './BestBruddas'
import BonusMultiplier from './BonusMultiplier'
import ReferalLinks from './ReferalLinks'
import StarPoint from './StarPoint'
import UserLevel from './UserLevel'
import UserPoints from './UserPoints'

interface UserInfoProperties extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserInfo({ className, ...props }: UserInfoProperties) {
  return (
    <div className={cn('', className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className=" h-auto">
            <div className="flex w-[77rem] flex-col rounded-3xl bg-cards-widget font-montreal">
              <div className="flex items-center">
                <div className="flex w-[34rem] flex-row items-center justify-center">
                  <div className="p-6">
                    <img
                      src={UserAvatar}
                      alt="user avatar"
                      className="h-auto w-[12.375rem]"
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2 text-[2.625rem] font-medium">
                      <span className="text-violet-100">Test Muckle</span>
                      <div className="flex items-center gap-2">
                        <p className="rounded-md bg-violet-100 px-2 py-1 text-sm text-white">
                          LVL 1
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium leading-5 text-text-2100">
                      "I would walk 20 miles to listen to my worst enemy if I could learn
                      something."
                    </p>

                    <div className="mt-4 flex gap-2">
                      <BonusMultiplier multiplier={1.5} />
                      <StarPoint value={200} />
                      <UserPoints value={25} />
                    </div>
                  </div>
                </div>

                <div className="ml-auto pl-32 pr-16">
                  <UserLevel className="w-full" />
                </div>
              </div>
            </div>
            <LeaderBoard className="mt-4" />
          </div>
          <ReferalLinks codes={['B12GAH', '0FA882', '123456']} />
        </div>
      </div>
    </div>
  )
}
