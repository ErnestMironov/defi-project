import { GATEWAY_ABI } from '@abi/gateway'
import { TOKEN_VAULT } from '@abi/token-vault'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import BigNumber from 'bignumber.js'
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
  const { setCurrentModal, inputValue, mtToken } = useTxStore()

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

  const { sharesBalance, tokenVaultAddress } = useVaultBalance(mtToken?.mtAddress)
  console.log('🚀 ~ useWithdrawTransaction ~ mtToken?.mtAddress:', mtToken?.mtAddress)
  console.log('🚀 ~ useWithdrawTransaction ~ sharesBalance:', sharesBalance)

  const { data: sharesRequest } = useReadContract({
    abi: TOKEN_VAULT,
    address: mtToken?.mtAddress,
    args: [amount],
    functionName: 'previewWithdraw',
    query: {
      enabled: !!tokenVaultAddress,
    },
  })

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

  const isAllowed = (() => {
    if (!sharesAllowed) return
    return BigNumber(sharesAllowed.toString())
      .div(10 ** 6)
      .isGreaterThanOrEqualTo(BigNumber(inputValue))
  })()
  console.log('🚀 ~ isAllowed ~ isAllowed:', isAllowed)

  const isEnoughSharesToWithdraw = (() => {
    if (!sharesBalance || !sharesRequest) return
    return sharesBalance >= sharesRequest
  })()
  console.log('🚀 ~ isEnoughSharesToWithdraw ~ sharesRequest:', sharesRequest)
  console.log('🚀 ~ isEnoughSharesToWithdraw ~ sharesBalance:', sharesBalance)

  const { writeContract, ...rest } = useWriteContract({})
  console.log('��� ~ isEnoughSharesToWithdraw ~ isPending', rest?.isPending)

  const withdraw = () => {
    if (!address || !sharesRequest || !isEnoughSharesToWithdraw) return
    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'requestWithdraw',
        args: [mtToken?.asset as Address, sharesRequest as bigint, ARB_EID, address],
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
