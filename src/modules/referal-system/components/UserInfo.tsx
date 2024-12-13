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
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="h-auto w-full">
            <div className="flex w-full flex-col rounded-3xl bg-cards-widget font-montreal max-md:bg-transparent lg:w-[77rem]">
              <div className="flex flex-col items-center p-4 max-md:p-0 lg:flex-row">
                <div className="flex w-full flex-col items-center justify-center max-md:w-full max-md:rounded-3xl max-md:bg-cards-widget max-md:p-6 lg:w-[34rem] lg:flex-row">
                  <img
                    src={UserAvatar}
                    alt="user avatar"
                    className="mr-6 h-auto w-[12.375rem] max-md:w-full lg:w-[12.375rem]"
                  />

                  <div className="py-6 max-md:rounded-3xl">
                    <div className="flex flex-col items-center gap-2 text-xl font-medium lg:flex-row lg:text-[2.625rem]">
                      <span className="text-violet-100">Test Muckle</span>
                      <div className="flex items-center gap-2">
                        <p className="rounded-md bg-violet-100 px-2 py-1 text-sm text-white">
                          LVL 1
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 px-4 text-sm font-medium leading-5 text-text-2100 lg:px-0">
                      &quot;I would walk 20 miles to listen to my worst enemy if I could
                      learn something.&quot;
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                      <BonusMultiplier multiplier={1.5} />
                      <StarPoint value={200} />
                      <UserPoints value={25} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full px-4 max-md:w-full max-md:px-0 lg:ml-auto lg:mt-0 lg:w-auto">
                  <UserLevel className="w-full" />
                </div>
              </div>
            </div>
            <LeaderBoard className="mt-4" />
          </div>
          <ReferalLinks
            className="w-full lg:w-auto"
            codes={['B12GAH', '0FA882', '123456']}
          />
        </div>
      </div>
    </div>
  )
}
