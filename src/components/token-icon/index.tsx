import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import React from 'react'

interface TokenIconProperties extends React.SVGProps<SVGElement> {
  symbol?: string | null
  tokenLogoFallback?: string
}

export const TokenIconComponent = ({
  symbol,
  className,
  tokenLogoFallback,
  ...rest
}: TokenIconProperties) => {
  const asset = useTokenAsset(symbol)
  if (!asset && !tokenLogoFallback) return null

  if (!asset)
    return (
      <img
        src={tokenLogoFallback}
        className={clsx(className, 'overflow-visible')}
        alt=""
        style={rest.style}
      />
    )

  const { TokenIcon } = asset
  return <TokenIcon {...rest} className={clsx(className, 'overflow-visible')} />
}

export const IconWithLabelComponent = ({
  symbol,
  className,
  label,
  ...rest
}: TokenIconProperties & { label?: string }) => {
  const asset = useTokenAsset(symbol)
  if (!asset) return
  const { TokenIcon, symbol: assetSymbol } = asset
  return (
    <div className={cn('flex items-center gap-2 min-w-max', className)}>
      <TokenIcon {...rest} className={clsx(className, 'overflow-visible')} />
      <div className="leading-normal">{label || assetSymbol}</div>
    </div>
  )
}
