// eslint-disable-next-line import/extensions

import { GATEWAY_ABI } from '@abi/gateway'
import { TOKEN_VAULT } from '@abi/token-vault'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import BigNumber from 'bignumber.js'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'

import { useVaultBalance } from './useVaultBalance'

export const useWithdrawTransaction = () => {
  const { address } = useAccount()
  const { setCurrentModal, inputValue, mtToken, vault } = useTxStore()

  const amount = parseUnits(inputValue, 6)

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

  const { data: sharesAllowed } = useReadContract({
    abi: TOKEN_VAULT,
    address: tokenVaultAddress,
    args: [address, ARB_GATEWAY],
    functionName: 'allowance',
    query: {
      enabled: !!address && !!tokenVaultAddress,
    },
  })

  const isAllowed = (() => {
    if (!sharesAllowed) return
    return BigNumber(sharesAllowed.toString())
      .div(10 ** 6)
      .isGreaterThanOrEqualTo(BigNumber(inputValue))
  })()

  const isEnoughSharesToWithdraw = (() => {
    if (!sharesBalance || !sharesRequest) return
    return sharesBalance >= sharesRequest
  })()
  console.log('🚀 ~ isEnoughSharesToWithdraw ~ sharesRequest:', sharesRequest)
  console.log('🚀 ~ isEnoughSharesToWithdraw ~ sharesBalance:', sharesBalance)

  const { writeContract, ...rest } = useWriteContract({})

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
    return writeContract({
      address: mtToken?.asset as Address,
      abi: TOKEN_VAULT,
      functionName: 'approve',
      args: [ARB_GATEWAY, sharesBalance],
    })
  }

  return { withdraw, approve, isEnoughSharesToWithdraw, isAllowed, ...rest }
}
