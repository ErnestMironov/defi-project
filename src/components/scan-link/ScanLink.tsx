import Scan from '@assets/icons/scan.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface ScanLinkProperties extends ComponentProps<'svg'> {
  chainId: number
}

export const ScanLink = (props: ScanLinkProperties) => {
  const { chainId, className, ...rest } = props
  return (
    <Link to="https://etherscan.io/address/0x0000000000000000000000000000000000000000">
      <Scan className={cn('', className)} {...rest} />
    </Link>
  )
}
