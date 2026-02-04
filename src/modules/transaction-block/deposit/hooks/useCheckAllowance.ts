// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { ARB_GATEWAY } from '@constants/contract-address'
import { USE_MOCKS } from '@configs/mocks'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import BigNumber from 'bignumber.js'
import { useEffect } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'
import { useActiveAccount } from '@hooks/useActiveAccount'

export const useCheckAllowance = () => {
  const { depositAsset, inputValue } = useTxStore()
  const { address } = useActiveAccount()
  const { data, refetch, ...rest } = useReadContract({
    abi: erc20Abi,
    address: depositAsset?.contract_address as Address,
    args: [address as Address, ARB_GATEWAY],
    functionName: 'allowance',
    query: {
      enabled: !USE_MOCKS && !!inputValue && !!depositAsset?.contract_address && !!address,
    },
  })

  useEffect(() => {
    refetch()
  }, [inputValue, refetch])

  const isAllowed = (() => {
    if (USE_MOCKS) return true

    if (!data) return

    if (!depositAsset?.contract_decimals) return

    return BigNumber(data.toString())
      .div(10 ** depositAsset.contract_decimals)
      .isGreaterThanOrEqualTo(BigNumber(inputValue))
  })()

  return { isAllowed, ...rest }
}
