export const USDC_VAULT_ADDRESS = '0x1f1EeFc9eaa0d3989AbB8F384fDfFA843240eD1e'
export const USDT_VAULT_ADDRESS = '0x6bcCf39Ddc5f71B559B5fada94330eEc6945EE2b'

export const VAULTS = ['USDT', 'USDC'] as const
export type Vault = (typeof VAULTS)[number]
