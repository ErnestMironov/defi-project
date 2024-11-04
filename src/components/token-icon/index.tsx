import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import React from 'react'

interface TokenIconProperties extends React.SVGProps<SVGElement> {
  symbol?: string | number | null
  tokenLogoFallback?: string
}

export const TokenIconComponent = ({
  symbol,
  className,
  tokenLogoFallback,
  ...rest
}: TokenIconProperties) => {
  const asset = useTokenAsset(symbol)

  if (!asset && !tokenLogoFallback)
    return (
      <div
        className={cn(
          'aspect-square rounded-full bg-gray-300 flex items-center justify-center leading-none size-8 text-base',
          className,
        )}
      >
        {String(symbol)[0]}
      </div>
    )

  if (!asset)
    return (
      <img src={tokenLogoFallback} className={cn(className)} alt="" style={rest.style} />
    )

  const { TokenIcon } = asset
  return <TokenIcon {...rest} className={cn('', className)} />
}

export const IconWithLabelComponent = ({
  symbol,
  className,
  label,
  ...rest
}: TokenIconProperties & { label?: string }) => {
  const asset = useTokenAsset(symbol)
  if (!asset) return
  const { TokenIcon, name } = asset
  return (
    <div className={cn('flex items-center gap-2 min-w-max', className)}>
      <TokenIcon {...rest} className={cn(className, '')} />
      <div className="leading-normal">{label || name}</div>
    </div>
  )
}
