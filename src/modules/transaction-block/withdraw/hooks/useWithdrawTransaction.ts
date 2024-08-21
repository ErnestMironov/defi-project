import { GATEWAY_ABI } from '@abi/gateway'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { ARB_GATEWAY } from '@constants/contract-address'
import { EIDS_BY_CHAIN_ID } from '@constants/eids'
import type { STEP_STATUS } from '@modules/transaction-block/deposit/interfaces'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { convertBigIntToString } from '@utils/formatValue'
import { useState } from 'react'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { useVaultBalance } from './useVaultBalance'

export const useWithdrawTransaction = () => {
  const { address } = useAccount()
  const {
    setCurrentModal,
    inputValue,
    mtToken,
    setTransactionCanBeCollapsed,
    getFullState,
    setTransactionHash,
  } = useTxStore()

  const { addTransaction } = useTransactionStore()

  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const amount = parseUnits(inputValue, 6)

  const { sharesBalance } = useVaultBalance(mtToken?.mtAddress || '0x')

  const isEnoughSharesToWithdraw = (() => {
    if (!sharesBalance || !amount) return
    return (sharesBalance as bigint) >= amount
  })()

  const { writeContract, ...rest } = useWriteContract({})

  const withdraw = async () => {
    if (!address || !amount || !isEnoughSharesToWithdraw || !mtToken) return
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'requestWithdraw',
        args: [
          mtToken?.asset as Address,
          amount as bigint,
          EIDS_BY_CHAIN_ID[mtToken?.chainId ?? CHAIN_IDS_BY_NAME.Arbitrum],
          address,
        ],
      },

      {
        onSuccess: (data) => {
          setStatus('pending')
          setTransactionHash(data)
          const txState = getFullState()
          const txStateWithStringBigInt = convertBigIntToString(txState)
          // @ts-ignore
          addTransaction({
            ...txStateWithStringBigInt,
            status: 'pending',
            timestamp: Date.now(),
          })
          setTransactionCanBeCollapsed(true)
        },
        onError: (e) => {
          console.error(e.message)
          setCurrentModal('error')
          setStatus('error')
        },
      },
    )
  }

  return { withdraw, isEnoughSharesToWithdraw, ...rest, status }
}
