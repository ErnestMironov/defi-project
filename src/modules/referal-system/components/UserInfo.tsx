import Asterisk from '@assets/icons/asterisk.svg'
import StartBold from '@assets/icons/start-bold.svg'
import { cn } from '@utils/cn'

import UserAvatar from '../assets/avatar.png'

interface UserInfoProperties extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserInfo({ className, ...props }: UserInfoProperties) {
  return (
    <div className={cn('', className)} {...props}>
      <div className="">
        <div className="flex  h-auto w-[77rem] items-center rounded-3xl bg-cards-widget font-montreal">
          <div className="p-5">
            <img src={UserAvatar} alt="user avatar" className="width-[12.375rem]" />
          </div>
          <div>
            <div className="flex items-center  gap-2 text-[2.625rem] font-medium text-violet-100">
              Test Muckle{' '}
              <p className="rounded-md bg-violet-100 px-2 py-1 text-sm text-white">
                lvl 1
              </p>
            </div>

            <p className="text-sm font-medium leading-5 text-text-2100">
              "I would walk 20 miles to listen to my worst enemy if I could learn
              something."
            </p>

            <div className="mt-4 flex gap-2">
              <div className="flex items-center gap-1 rounded-md  bg-[#8585A90D] p-1 px-2">
                <Asterisk />
                <p className="text-sm font-medium text-text-2100">Multiplier</p>
                <p className="text-sm font-medium">x1.5</p>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-md  bg-main-15 p-1 px-2 text-sm">
                <p className="text-sm font-medium text-main-100">+</p>
                <StartBold className="size-4" />
                <p className="text-sm font-medium text-main-100">200</p>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-md  bg-main-15 p-1 px-2 text-sm">
                <StartBold className="size-4" />
                <p className="text-sm font-medium text-main-100">
                  25 / <span className="text-main-80">user</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
