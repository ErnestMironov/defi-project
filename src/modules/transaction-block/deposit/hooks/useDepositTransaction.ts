// eslint-disable-next-line import/extensions
import abi from 'abi/gateway.json'
import { useCallback } from 'react'
import { useWriteContract } from 'wagmi'

export const useDepositTransaction = () => {
  const { data: hash, writeContract } = useWriteContract()

  const deposit = useCallback(() => {
    return writeContract({
      address: '0x6225d3f73B4f934214dfAa0ACA2b7E7efd50aDc6',
      abi,
      functionName: 'deposit',
      args: [BigInt(tokenId)],
    })
  }, [writeContract])
}
