import BorderedArrowTopRight from '@assets/icons/bordered-arrow-top-right.svg'
import Scan from '@assets/icons/scan.svg'
import { SCAN_LINK_BY_CHAIN_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import ArbiScan from './assets/arbiscan.svg'
import SnowTrace from './assets/avascan.svg'
import BaseScan from './assets/basescan.svg'
import BscScan from './assets/bscscan.svg'
import MantleScan from './assets/mantlescan.svg'
import MetisScan from './assets/metiscan.svg'
import OptimisticScan from './assets/opscan.svg'
import PolygonScan from './assets/polyscan.svg'
import SeiScan from './assets/seiscan.svg'

type ScanLinkProperties = ComponentProps<'a'> & {
  chainId: number
  address?: string
  txHash?: string
  arrow?: boolean
}

const SCAN_LOGO_BY_CHAIN_ID = {
  1: Scan,
  42_161: ArbiScan,
  137: PolygonScan,
  10: OptimisticScan,
  1329: SeiScan,
  43_114: SnowTrace,
  56: BscScan,
  8453: BaseScan,
  5000: MantleScan,
  1088: MetisScan,
  2222: Scan,
  8217: Scan,
  8822: Scan,
  1_380_012_617: Scan,
  14: Scan,
  1625: Scan,
  167_000: Scan,
  534_352: Scan,
  1_313_161_554: Scan,
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
  const { chainId, address, txHash, children, arrow = true, className, ...rest } = props
  const path = address
    ? SCAN_ADDRESS_PATH_BY_CHAIN_ID[
        chainId as keyof typeof SCAN_ADDRESS_PATH_BY_CHAIN_ID
      ] + address
    : SCAN_TX_PATH_BY_CHAIN_ID[chainId as keyof typeof SCAN_TX_PATH_BY_CHAIN_ID] + txHash
  const ScanLogo = SCAN_LOGO_BY_CHAIN_ID[chainId as keyof typeof SCAN_LOGO_BY_CHAIN_ID]
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
      {arrow ? (
        <BorderedArrowTopRight className={cn('size-4', className)} />
      ) : (
        children || <ScanLogo className="size-full" />
      )}
    </Link>
  )
}

export const useScanLink = ({
  chainId,
  address,
  txHash,
}: {
  chainId: number
  txHash: string
  address?: string
}) => {
  const path = address
    ? SCAN_ADDRESS_PATH_BY_CHAIN_ID[
        chainId as keyof typeof SCAN_ADDRESS_PATH_BY_CHAIN_ID
      ] + address
    : SCAN_TX_PATH_BY_CHAIN_ID[chainId as keyof typeof SCAN_TX_PATH_BY_CHAIN_ID] + txHash
  return `${SCAN_LINK_BY_CHAIN_ID[chainId as keyof typeof SCAN_LINK_BY_CHAIN_ID]}${path}`
}
