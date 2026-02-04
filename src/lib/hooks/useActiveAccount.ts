import { USE_MOCKS } from '@configs/mocks'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

const MOCK_ADDRESS = '0x1111111111111111111111111111111111111111' as Address
const MOCK_CHAIN_ID = 42161

export const useActiveAccount = () => {
  const account = useAccount()

  if (USE_MOCKS && !account.isConnected) {
    return {
      ...account,
      address: MOCK_ADDRESS,
      isConnected: true,
      chainId: MOCK_CHAIN_ID,
    }
  }

  return account
}
