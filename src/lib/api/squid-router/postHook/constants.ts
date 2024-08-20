// Addresses

export const NATIVE_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// Currencies and Tokens

export enum Tokens {
  USDC,
  USDT,
}

export const TOKEN_VAULT_ADDRESSES = {
  [Tokens.USDC]: '0x9C0F7b07baa9e5C0C156452301C3c3dB37b486Fe',
  [Tokens.USDT]: '0x965ff3F7c2989fC23e933631582269A78924137e',
}

type ChainsByVault = {
  [key in Tokens]: number[]
}

export const SupportedChainIds = [10, 56, 137, 1088, 5000, 8453, 42_161, 43_114]

export const SupportedChainsByVault: ChainsByVault = {
  [Tokens.USDC]: [10, 137, 5000, 8453, 42_161, 43_114],
  [Tokens.USDT]: [10, 137, 56, 5000, 42_161, 43_114, 1088],
}
