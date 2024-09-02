// Addresses

export const NATIVE_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// Currencies and Tokens

export enum Tokens {
  USDC,
  USDT,
}

export const TOKEN_VAULT_ADDRESSES = {
  [Tokens.USDC]: '0x1f1EeFc9eaa0d3989AbB8F384fDfFA843240eD1e',
  [Tokens.USDT]: '0x6bcCf39Ddc5f71B559B5fada94330eEc6945EE2b',
}

type ChainsByVault = {
  [key in Tokens]: number[]
}

export const SupportedChainIds = [10, 56, 137, 1088, 5000, 8453, 42_161, 43_114]

export const SupportedChainsByVault: ChainsByVault = {
  [Tokens.USDC]: [10, 137, 5000, 8453, 42_161, 43_114],
  [Tokens.USDT]: [10, 137, 56, 5000, 42_161, 43_114, 1088],
}
