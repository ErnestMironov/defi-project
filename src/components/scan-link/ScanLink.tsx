import Scan from '@assets/icons/scan.svg'
import { SCAN_LINK_BY_CHAIN_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type ScanLinkProperties = ComponentProps<'a'> & {
  chainId: number
  address?: string
  txHash?: string
}

export const SCAN_ADDRESS_PATH_BY_CHAIN_ID = {
  1: 'address/',
  42_161: 'address/',
  137: 'address/',
  10: 'address/',
  1329: 'address/',
  43_114: 'address/',
  56: 'address/',
  8453: 'address/',
  5000: 'address/',
  1088: 'address/',
  2222: 'address/',
  8217: 'address/',
  8822: 'address/',
  1_380_012_617: 'address/',
  14: 'address/',
  1625: 'address/',
  167_000: 'address/',
  534_352: 'address/',
  1_313_161_554: 'address/',
} as const

const SCAN_TX_PATH_BY_CHAIN_ID = {
  1: 'tx/',
  42_161: 'tx/',
  137: 'tx/',
  10: 'tx/',
  1329: 'tx/',
  43_114: 'tx/',
  56: 'tx/',
  8453: 'tx/',
  5000: 'tx/',
  1088: 'tx/',
  2222: 'tx/',
  8217: 'tx/',
  8822: 'tx/',
  1_380_012_617: 'tx/',
  14: 'tx/',
  1625: 'tx/',
  167_000: 'tx/',
  534_352: 'tx/',
  1_313_161_554: 'tx/',
}

export const ScanLink = (props: ScanLinkProperties) => {
  const { chainId, className, address, txHash, ...rest } = props
  const path = address
    ? SCAN_ADDRESS_PATH_BY_CHAIN_ID[
        chainId as keyof typeof SCAN_ADDRESS_PATH_BY_CHAIN_ID
      ] + address
    : SCAN_TX_PATH_BY_CHAIN_ID[chainId as keyof typeof SCAN_TX_PATH_BY_CHAIN_ID] + txHash

  return (
    <Link
      to={`${
        SCAN_LINK_BY_CHAIN_ID[chainId as keyof typeof SCAN_LINK_BY_CHAIN_ID]
      }${path}`}
      target="_blank"
      onClick={(e) => {
        e.stopPropagation()
      }}
      {...rest}
    >
      <Scan className={cn('size-full', className)} />
    </Link>
  )
}
