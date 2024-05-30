import { defineChain } from 'viem'
import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const XFI_CHAIN_ID = 4157

const XFI_TESTNET = defineChain({
  id: XFI_CHAIN_ID,

  name: 'CrossFi Testnet',
  nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.ms'] },
  },
  blockExplorers: {
    default: { name: 'CrossFi Testnet Explorer', url: 'https://scan.testnet.ms' },
  },
})

export const wagmiConfig = createConfig({
  chains: [mainnet, XFI_TESTNET],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [XFI_CHAIN_ID]: http(),
  },
})
