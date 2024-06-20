import { useTokenAsset } from '@hooks/useTokenAsset'
import clsx from 'clsx'
import React from 'react'

interface TokenIconProperties extends React.SVGProps<SVGElement> {
  symbol?: string | null
}

export const TokenIconComponent = ({
  symbol,
  className,
  ...rest
}: TokenIconProperties) => {
  const asset = useTokenAsset(symbol)
  if (!asset) return
  const { TokenIcon } = asset
  return <TokenIcon {...rest} className={clsx(className, 'overflow-visible')} />
}
