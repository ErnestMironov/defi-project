import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import { ShadowBox } from '@components/box/ShadowBox'
import { Button } from '@components/ui/button'
import { TX_TYPE } from '@constants/txTypes'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { useAccount } from 'wagmi'

import { TVLDisplay } from './components/TVLDisplay'
import { DepositInput } from './deposit/DepositInput'
import { useSetDepositDetails } from './deposit/hooks/useSetDepositDetails'
import { DoneModal } from './DoneModal'
import { FailModal } from './FailModal'
import { useTxStore } from './store/useTxStore'
import { TxTypeSwitcher } from './TxTypeSwither'
import { WithdrawInput } from './withdraw/WithdrawInput'

interface DepositBlockProperties extends ComponentProps<'div'> {}

export const TransactionBlock = (props: DepositBlockProperties) => {
  const { className, ...rest } = props
  const { txType } = useTxStore()

  const { isBelowDesktop } = useDeviceWidth()

  useGetSquidSwapRoute()
  useSetDepositDetails()

  const { open: openConnectModal } = useWeb3Modal()

  const { isConnected } = useAccount()

  return (
    <>
      <ShadowBox
        className={clsx(
          'flex w-full flex-col px-6 py-8 max-lg:gap-6 max-lg:p-4',
          className,
        )}
        {...rest}
      >
        <div className="flex max-lg:flex-col max-lg:items-end max-lg:gap-6 lg:mb-10 lg:items-center lg:justify-between">
          <TxTypeSwitcher />
          {!isBelowDesktop && <TVLDisplay />}
        </div>
        {txType === TX_TYPE.DEPOSIT && <DepositInput />}
        {txType === TX_TYPE.WITHDRAW && <WithdrawInput />}
        {!isConnected && (
          <Button
            className="w-full lg:mt-10"
            size="lg"
            onClick={() => openConnectModal()}
          >
            Connect wallet
          </Button>
        )}
      </ShadowBox>
      <FailModal />
      <DoneModal />
    </>
  )
}
