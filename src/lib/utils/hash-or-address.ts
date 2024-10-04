import { isAddress, isHex } from 'viem'

export function isHashOrAddress(value: string | undefined): boolean {
  return Boolean(value && (isAddress(value) || (value.length === 66 && isHex(value))))
}
