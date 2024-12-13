import { useGetAddressInfo } from '@api/maat-finance/refferal-system/useGetAddressInfo'
import { useGetUsersPoints } from '@api/maat-finance/useGetUsersPoints'
import { useCheckRegistration } from '@hooks/useCheckRegistration'
import { useLocalReferralCodes } from '@hooks/useLocalReferralCodes'
import { useLocalSignature } from '@hooks/useLocalSignature'
import EarningMethodCard from '@modules/referal-system/components/EarningMethodCard'
import InfoBlock from '@modules/referal-system/components/InfoBlock'
import UserInfo from '@modules/referal-system/components/UserInfo'
import { type ComponentProps, useEffect } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

interface PointsProperties extends ComponentProps<'div'> {}

const EARNING_METHODS = [
  {
    title: 'Da yeeld',
    description: 'To find da clucks you need to have da yeeld',
  },
  {
    title: 'Da Godes',
    description: 'Stay loyal to da godes - da non believers will be spit on',
  },
  {
    title: 'Da Belief',
    description: 'Spit on da non believer',
  },
  {
    title: 'Da Frens',
    description: 'Help bruddas find da yeeld and find yeeld urself.',
  },
] as const

export const Points = (_props: PointsProperties) => {
  const { data } = useGetUsersPoints()
  const account = useAccount()
  useCheckRegistration()

  const filteredData = data?.items.filter(({ totalRewards }) => totalRewards > 0)

  const { referralCodes, setReferralCodes, clearReferralCodes } = useLocalReferralCodes()
  const { signature } = useLocalSignature()

  const { addressInfo } = useGetAddressInfo({
    address: account.address as Address,
    signature: signature || '',
  })

  useEffect(() => {
    if (addressInfo?.created_referral_codes) {
      clearReferralCodes()
      setReferralCodes(addressInfo.created_referral_codes)
    }
  }, [addressInfo?.created_referral_codes])

  const validCodes = referralCodes.filter((referralCode) => referralCode.is_valid)

  return (
    <div className="flex flex-col gap-6 bg-bg">
      <InfoBlock className="" />
      <div className="mt-12 grid grid-cols-4 gap-4 max-md:grid-cols-1 max-md:gap-6 max-md:rounded-3xl max-md:bg-cards-widget max-md:p-6">
        {EARNING_METHODS.map((earningMethod) => (
          <EarningMethodCard earningMethod={earningMethod} />
        ))}
      </div>

      <div className="mb-12">
        <div className="col-span-1">
          <UserInfo className="" />
        </div>
      </div>
    </div>
  )
}
