// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import BigNumber from 'bignumber.js'
import { useEffect } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useCheckAllowance = () => {
  const { depositAsset, inputValue } = useTxStore()
  const { address } = useAccount()
  const { data, refetch, ...rest } = useReadContract({
    abi: erc20Abi,
    address: depositAsset?.contract_address as Address,
    args: [address as Address, ARB_GATEWAY],
    functionName: 'allowance',
    query: {
      enabled: !!inputValue && !!depositAsset?.contract_address && !!address,
    },
  })

  useEffect(() => {
    refetch()
  }, [inputValue, refetch])

  const isAllowed = (() => {
    if (!data) return

    if (!depositAsset?.contract_decimals) return

    return BigNumber(data.toString())
      .div(10 ** depositAsset.contract_decimals)
      .isGreaterThanOrEqualTo(BigNumber(inputValue))
  })()

  return { isAllowed, ...rest }
}
