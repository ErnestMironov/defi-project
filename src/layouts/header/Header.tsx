import { useGetAddressInfo } from '@api/maat-finance/refferal-system/useGetAddressInfo'
import { useGetUserPoints } from '@api/maat-finance/useGetUserPoints'
import { CopyButton } from '@components/copy/CopyButton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useLocalReferralCodes } from '@hooks/useLocalReferralCodes'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { ROUTES } from '@routes/routes'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { type ComponentProps, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const account = useAccount()
  const [open, setOpen] = useState(false)

  const { data: userPoints } = useGetUserPoints(account.address as Address)
  const { signature } = useLocalSignature()

  const { referralCodes, setReferralCodes, clearReferralCodes } = useLocalReferralCodes()

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

  const dropdownVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  if (isBelowDesktop) {
    return <MobileHeader className={className} {...rest} />
  }
  return (
    <header
      {...rest}
      className={clsx('flex w-full items-center justify-between', className)}
    >
      <div className="h-16">
        <Sidebar />
      </div>
      {account.address ? (
        <div className="relative min-w-64">
          {validCodes.length > 0 && (
            <motion.div
              className="absolute inset-x-0 top-0 flex flex-col items-stretch overflow-hidden rounded-[2rem] bg-[rgba(239,242,253,0.50)] dark:bg-[#9998B80D]"
              initial="closed"
              animate={open ? 'open' : 'closed'}
              variants={dropdownVariants}
            >
              <div
                className="flex items-center justify-between gap-2 p-5 pt-20 text-[1.25rem] font-normal leading-[120%] text-gray-100"
                style={{
                  justifyContent: validCodes.length > 1 ? 'space-between' : 'center',
                }}
              >
                {validCodes.map((referralCode) => (
                  <div key={referralCode.code} className="flex items-center gap-2">
                    {referralCode.code}
                    <CopyButton text={referralCode.code} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          <Link to={ROUTES.POINTS}>
            <PointsBalance />
          </Link>
        </div>
      ) : (
        <ConnectWallet className="rounded-[12.5rem] bg-cards-widget px-6 py-4 text-[1.25rem] text-gray-100 dark:bg-[rgba(153,_152,_184,_0.10)] dark:text-white" />
      )}
    </header>
  )
}
