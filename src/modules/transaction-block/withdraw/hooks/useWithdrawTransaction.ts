import { GATEWAY_ABI } from '@abi/gateway'
import { TOKEN_VAULT } from '@abi/token-vault'
import { quoteOftSend } from '@api/squid-router/postHook/quoteOftSend'
import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { ARB_GATEWAY } from '@constants/contract-address'
import { EIDS_BY_CHAIN_ID } from '@constants/eids'
import { getEthersProvider } from '@hooks/web3/useEthersProvider'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { BigNumber } from 'bignumber.js'
import type { Provider } from 'ethers'
import { useState } from 'react'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useSwitchChain,
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

  const { switchChain: _switchChain } = useSwitchChain()

  const { status: approveTxStatus } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
    confirmations:
      CONFIRMATIONS_NUMBER[mtToken?.chainId as keyof typeof CONFIRMATIONS_NUMBER],
    chainId: mtToken?.chainId,
    timeout: 60_000,
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

  if (approveTxStatus === 'success') {
    setLoading(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    setApproveHash(undefined)
    refetchSharesAllowed()
  }

  const { sharesBalance } = useVaultBalance(mtToken?.mtAddress || '0x')

  const isAllowed = (() => {
    if (!sharesAllowed) return
    return BigNumber(sharesAllowed.toString()).isGreaterThanOrEqualTo(
      BigNumber(parseUnits(inputValue, 6).toString()),
    )
  })()

  const isEnoughSharesToWithdraw = (() => {
    if (!sharesBalance || !amount) return
    return (sharesBalance as bigint) >= amount
  })()

  const { writeContract, ...rest } = useWriteContract({})

  const withdraw = async () => {
    if (!address || !amount || !isEnoughSharesToWithdraw || !mtToken) return
    const provider = getEthersProvider()

    let value = 0n
    if (mtToken?.chainId !== CHAIN_IDS_BY_NAME.Arbitrum) {
      value =
        (await quoteOftSend(
          mtToken?.mtAddress,
          EIDS_BY_CHAIN_ID[CHAIN_IDS_BY_NAME.Arbitrum],
          address,
          provider as Provider,
        )) * 2n
    }
    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'requestWithdraw',
        value,
        args: [
          mtToken?.asset as Address,
          amount as bigint,
          EIDS_BY_CHAIN_ID[mtToken?.chainId ?? CHAIN_IDS_BY_NAME.Arbitrum],
          address,
        ],
      },

      {
        onSuccess: () => setCurrentModal('done'),
        onError: (e) => {
          console.error(e.message)
          setCurrentModal('error')
        },
      },
    )
  }
  const approve = () => {
    if (!mtToken?.asset) return
    setLoading(true)
    _switchChain({
      chainId: mtToken?.chainId,
    })
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
        },
        onError: () => setLoading(false),
      },
    )
  }

  return { withdraw, approve, isEnoughSharesToWithdraw, isAllowed, loading, ...rest }
}
