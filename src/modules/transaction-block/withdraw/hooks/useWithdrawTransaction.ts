import { GATEWAY_ABI } from '@abi/gateway'
import { TOKEN_VAULT } from '@abi/token-vault'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { ARB_GATEWAY } from '@constants/contract-address'
import { EIDS_BY_CHAIN_ID } from '@constants/eids'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import BigNumber, { BigNumber } from 'bignumber.js'
import { useState } from 'react'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { useVaultBalance } from './useVaultBalance'

export const useWithdrawTransaction = () => {
  const { address } = useAccount()
  const { setCurrentModal, inputValue, mtToken, withdrawNetwork } = useTxStore()

  const [loading, setLoading] = useState(false)

  const [approveHash, setApproveHash] = useState<Address | undefined>()
  const amount = parseUnits(inputValue, 6)

  const { status: approveTxStatus } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
  })

  if (approveTxStatus === 'success') {
    setLoading(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    setApproveHash(undefined)
  }

  const { sharesBalance } = useVaultBalance(mtToken?.mtAddress)

  const { data: sharesAllowed, refetch: refetchSharesAllowed } = useReadContract({
    abi: TOKEN_VAULT,
    address: mtToken?.mtAddress,
    args: [address, ARB_GATEWAY],
    functionName: 'allowance',
    query: {
      enabled: !!address && !!mtToken?.mtAddress,
    },
  })
  console.log('🚀 ~ useWithdrawTransaction ~ sharesAllowed:', sharesAllowed)
  console.log('🚀 ~ isAllowed ~ inputValue:', inputValue)

  const isAllowed = (() => {
    if (!sharesAllowed) return
    return BigNumber(sharesAllowed.toString()).isGreaterThanOrEqualTo(
      BigNumber(parseUnits(inputValue, 6).toString()),
    )
  })()
  console.log(
    '🚀 ~ isAllowed ~ parseUnits(inputValue, 6).toString():',
    parseUnits(inputValue, 6).toString(),
  )
  console.log('🚀 ~ isAllowed ~ isAllowed:', isAllowed)

  const isEnoughSharesToWithdraw = (() => {
    if (!sharesBalance || !amount) return
    return (sharesBalance as bigint) >= amount
  })()

  const { writeContract, ...rest } = useWriteContract({})

  const withdraw = () => {
    if (!address || !amount || !isEnoughSharesToWithdraw) return

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'requestWithdraw',
        args: [
          mtToken?.asset as Address,
          amount as bigint,
          EIDS_BY_CHAIN_ID[withdrawNetwork ?? CHAIN_IDS_BY_NAME.Arbitrum],
          address,
        ],
      },
      {
        onSuccess: () => setCurrentModal('done'),
        onError: () => setCurrentModal('error'),
      },
    )
  }
  const approve = () => {
    if (!mtToken?.asset) return
    setLoading(true)
    return writeContract(
      {
        address: mtToken?.mtAddress as Address,
        abi: TOKEN_VAULT,
        functionName: 'approve',
        args: [ARB_GATEWAY, parseUnits(inputValue, 6)],
      },
      {
        onSuccess: (data) => {
          setApproveHash(data)
          refetchSharesAllowed()
        },
        onError: () => setLoading(false),
      },
    )
  }

  return { withdraw, approve, isEnoughSharesToWithdraw, isAllowed, loading, ...rest }
}
