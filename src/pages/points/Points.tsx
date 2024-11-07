import { useGetAddressInfo } from '@api/maat-finance/refferal-system/useGetAddressInfo'
import { useGetUsersPoints } from '@api/maat-finance/useGetUsersPoints'
import PointIcon from '@assets/icons/point-icon.svg'
import FrensImg from '@assets/images/points-frens.jpg'
import Mackls from '@assets/images/points-mackls.jpg'
import { CopyButton } from '@components/copy/CopyButton'
import { useCheckRegistration } from '@hooks/useCheckRegistration'
import { useLocalReferralCodes } from '@hooks/useLocalReferralCodes'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { formatAmount } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import { type ComponentProps, useEffect, useState } from 'react'
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

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-8 lg:py-[7.81rem]">
      <PointsBalance className="p-4 text-[1.125rem] lg:hidden" />
      <div className="flex grid-cols-[17.9rem_43.75rem_17.9rem] flex-col items-start justify-center gap-4 lg:grid">
        <div />
        <div>
          <div className="rounded-3xl bg-white dark:bg-cards">
            <div className="rounded-b-none rounded-t-3xl border-b border-b-stroke-element p-6 dark:border-b-stroke-100 lg:py-8">
              <h2 className="text-[1.5rem] leading-[120%] lg:text-[1.75rem]">
                What are Clucks?
              </h2>
              <p className="mt-4 leading-[120%] text-text-50 lg:mt-6 lg:text-[1.25rem]">
                Clucks are special points issued to users who actively participate in the
                MAAT Protocol. They represent your engagement level and can unlock various
                benefits within the platform.
              </p>
            </div>
            <div className="px-6 py-8">
              <h2 className="text-[1.5rem] leading-[120%] lg:text-[1.75rem]">
                How to earn Clucks?
              </h2>
              <div className="mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6">
                {EARNING_METHODS.map(({ title, description }) => (
                  <div key={title} className="flex flex-col gap-3">
                    <h3 className="text-[1.25rem] leading-[120%] lg:text-[1.5rem]">
                      {title}
                    </h3>
                    <p className="leading-[120%] text-text-50 lg:text-[1.125rem]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-3xl bg-white px-6 dark:bg-cards">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center justify-between py-6 lg:py-8"
            >
              <h2 className="select-none text-[1.5rem] leading-[120%] lg:text-[1.75rem]">
                Best Bruddas
              </h2>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronDownIcon className="size-6" />
              </motion.div>
            </div>
            <motion.ul
              className="flex h-0 flex-col gap-6 overflow-hidden"
              initial={{ height: 0, paddingBottom: 0 }}
              animate={{
                height: isOpen ? 'auto' : 0,
                paddingBottom: isOpen ? '2rem' : 0,
              }}
              exit={{ height: 0, paddingBottom: 0 }}
              transition={{ duration: 0.15 }}
            >
              {filteredData?.map(({ address, totalRewards }, index) => (
                <li key={address} className="flex items-center justify-between">
                  <p className="flex items-center">
                    <span className="w-8">{index + 1}.</span>
                    {shortenAddress(address)}
                  </p>
                  <div className="flex items-center gap-2 text-[1.1875rem] font-medium">
                    {formatAmount(Math.trunc(totalRewards))}
                    <PointIcon className="relative -top-0.5 size-6" />
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 rounded-3xl bg-[#FFF] p-6 dark:bg-cards lg:p-8">
            <h2 className="text-center text-[1.5rem] leading-[120%] lg:text-[1.75rem]">
              Da Frens
            </h2>
            <img src={FrensImg} alt="frens" className="w-full" />
            <p className="text-text-100 opacity-40">Invite frens and receive Clucks</p>
            <div className="flex flex-col gap-4">
              {validCodes.map((referralCode) => (
                <div className="flex justify-between">
                  <div key={referralCode.code} className="flex items-center gap-2">
                    <span className="w-[4.8rem] text-[1.25rem] uppercase leading-[120%] text-gray-100">
                      {referralCode.code}
                    </span>
                    <CopyButton text={referralCode.code} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[1.3125rem] font-medium leading-[120%] text-main-100 dark:text-white">
                      100
                    </span>
                    <PointIcon className="relative -top-0.5 size-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl bg-[#FFF] p-6 dark:bg-cards lg:p-8">
            <h2 className="text-[1.5rem] leading-[120%] lg:text-[1.75rem]">
              Special Quests
            </h2>
            <img src={Mackls} alt="mackls" className="w-full" />
            <p className="text-text-100 opacity-40">Stay updated, MAAT is cooking</p>
          </div>
        </div>
      </div>
    </div>
  )
}
