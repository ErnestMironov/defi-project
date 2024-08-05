// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useCallback, useState } from 'react'
import { type Address, formatUnits } from 'viem'
import { useAccount, useConfig, useWriteContract } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  address: Address
  amount: bigint
}

export const useDepositTransaction = ({
  address,
  amount,
  onSuccessHandler,
}: IProperties) => {
  const { writeContract, ...rest } = useWriteContract()
  const { setCurrentModal, setDepositAmount } = useTxStore()
  const { address: userAddress } = useAccount()
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const config = useConfig()

  const deposit = useCallback(() => {
    console.log(
      '🚀 ~ deposit ~ address, amount, userAddress, ARB_EID:',
      address,
      amount,
      userAddress,
      ARB_EID,
    )
    if (!address || !userAddress) return
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'deposit',
        args: [address, amount, userAddress, ARB_EID],
      },
      {
        onSuccess: async (data) => {
          setStatus('pending')
          // setApproveHash(data)
          console.log('simple_deposit_timer', data)
          console.time('simple_deposit_timer')
          // @ts-ignore
          await waitForTransactionReceipt(config, {
            hash: data,
            chainId: CHAIN_IDS_BY_NAME.Arbitrum,
            confirmations: CONFIRMATIONS_NUMBER[CHAIN_IDS_BY_NAME.Arbitrum],
            timeout: 60_000,
          })

          console.timeLog('simple_deposit_timer')
          console.timeEnd('simple_deposit_timer')

          console.log('🚀 ~ approve ~ timer: end', data)

          setStatus('success')

          onSuccessHandler?.()
          setCurrentModal('done')
          setDepositAmount(formatUnits(amount, 6))
        },
        onError: (err) => {
          console.error('Error depositing', err)
          setCurrentModal('error')
        },
      },
    )
  }, [
    address,
    amount,
    config,
    onSuccessHandler,
    setCurrentModal,
    setDepositAmount,
    userAddress,
    writeContract,
  ])

  return { deposit, ...rest, status }
}
