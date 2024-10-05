import { isAddress, isHex } from 'viem'

export const isHash = (value: string | undefined): boolean => {
  return Boolean(value && (isHex(value) || value.length === 66))
}

export function isHashOrAddress(value: string | undefined): boolean {
  return Boolean(value && (isAddress(value) || isHash(value)))
}
