import { useGetAddressInfo } from '@api/maat-finance/refferal-system/useGetAddressInfo'
import { useGetUserBadges } from '@api/maat-finance/refferal-system/useGetUserBadges'
import UserAvatar from '@assets/images/userAvatar.svg'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { cn } from '@utils/cn'
import type { Address } from 'viem'

import BonusMultiplier from './BonusMultiplier'
import { Incentives } from './Incentives'
import LeaderBoard from './LeaderBoard'
import { OtherBenefits } from './OtherBenefits'
import ReferalLinks from './ReferalLinks'
import UserNextLevel from './UserNextLevel'
import { useActiveAccount } from '@hooks/useActiveAccount'

interface UserInfoProperties extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserInfo({ className, ...props }: UserInfoProperties) {
  const { address } = useActiveAccount()
  const account = useActiveAccount()
  const { signature } = useLocalSignature()
  const { data: badgesInfo } = useGetUserBadges(address as Address)
  const { addressInfo } = useGetAddressInfo({
    address: account.address as Address,
    signature: signature || '',
  })

  return (
    <div className={cn('', className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="h-auto w-full max-w-[77rem]">
            <div className="flex w-full flex-col rounded-3xl bg-cards-widget font-montreal max-md:bg-transparent">
              <div className="flex flex-col items-center rounded-3xl shadow-test-2  max-md:p-0 lg:flex-row">
                <div className="flex w-full flex-col items-center max-md:w-full max-md:items-start max-md:gap-6 max-md:rounded-3xl max-md:bg-cards-widget  max-md:p-6 lg:flex-row">
                  <div className="p-6  max-md:mx-auto max-md:p-0">
                    <UserAvatar className=" h-auto w-[12.375rem] rounded-full bg-violet-100 max-md:w-full lg:w-[12.375rem]" />
                  </div>

                  <div className="py-6 max-md:rounded-3xl max-md:py-0">
                    <div className="flex flex-col items-center gap-2 text-xl font-medium max-md:flex-row lg:flex-row lg:text-[2.625rem]">
                      <span className="text-violet-100 max-md:text-[2rem]">
                        {badgesInfo?.currentLvl?.name}
                      </span>
                      <div className="flex items-center ">
                        <p className="rounded-md bg-violet-100 px-2 py-1 text-sm text-white">
                          LVL {badgesInfo?.currentLvl?.level}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 px-4 text-sm font-medium leading-5 text-text-2100 max-md:px-0 lg:px-0">
                      {badgesInfo?.currentLvl?.description}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 max-md:justify-start lg:justify-start">
                      <BonusMultiplier
                        multiplier={
                          badgesInfo?.currentLvl?.benefits.globalRewardMultiplier ?? 0
                        }
                      />
                      <Incentives
                        incentives={
                          badgesInfo?.currentLvl.benefits.benefitsDescription
                            .incentives ?? null
                        }
                      />
                      <OtherBenefits
                        otherBenefits={
                          badgesInfo?.currentLvl.benefits.benefitsDescription
                            .other_benefits ?? null
                        }
                      />
                    </div>
                  </div>
                </div>
                {badgesInfo?.currentLvl.benefits.benefitsDescription.other_benefits}

                <div className="mt-4 block w-full pl-32 pr-16 max-md:hidden max-md:w-full max-md:px-0 lg:mt-0">
                  <UserNextLevel
                    className="w-full "
                    currentLevel={badgesInfo?.currentLvl}
                    nextLevel={badgesInfo?.nextLvl}
                    userRewards={badgesInfo?.userRewards}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 hidden w-full pl-32 pr-16 max-md:block max-md:w-full max-md:px-0 lg:mt-0">
              <UserNextLevel
                className="w-full "
                currentLevel={badgesInfo?.currentLvl}
                nextLevel={badgesInfo?.nextLvl}
                userRewards={badgesInfo?.userRewards}
              />
            </div>
            <div className="hidden md:block">
              <LeaderBoard className="mt-4" />
            </div>
          </div>
          <ReferalLinks
            className="w-full lg:w-[33rem]"
            codes={addressInfo?.created_referral_codes.map((code) => code.code) ?? []}
            points={100 ?? 0}
          />
        </div>
      </div>
      <div className="md:hidden">
        <LeaderBoard className="mt-[0.88rem]" />
      </div>
    </div>
  )
}
