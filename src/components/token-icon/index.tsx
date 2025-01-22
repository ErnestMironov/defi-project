import useDeviceWidth from '@hooks/common/useDeviceWidth'
import type { ITokenAsset } from '@hooks/common/useTokenAsset'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import React from 'react'

interface TokenIconProperties extends React.SVGProps<SVGElement> {
  symbol?: string | number | null
  tokenLogoFallback?: string
}

const getTokenIcon = (asset: ITokenAsset | undefined, isMobile: boolean) => {
  if (!asset) return
  return isMobile && asset.TokenIconMobile ? asset.TokenIconMobile : asset.TokenIcon
}

export const TokenIconComponent = ({
  symbol,
  className,
  tokenLogoFallback,
  ...rest
}: TokenIconProperties) => {
  const asset = useTokenAsset(symbol)
  const { isBelowDesktop } = useDeviceWidth()

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

  const Icon = getTokenIcon(asset, isBelowDesktop)
  if (!Icon) return
  return <Icon {...rest} className={cn('size-5 rounded-md overflow-hidden', className)} />
}

export const IconWithLabelComponent = ({
  symbol,
  className,
  label,
  ...rest
}: TokenIconProperties & { label?: string }) => {
  const asset = useTokenAsset(symbol)
  const { isBelowDesktop } = useDeviceWidth()

  if (!asset) return

  const Icon = getTokenIcon(asset, isBelowDesktop)
  if (!Icon) return
  const { name } = asset

  return (
    <div className={cn('flex items-center gap-[0.38rem]')}>
      <Icon
        {...rest}
        className={cn('size-5 max-lg:size-4 rounded overflow-hidden', className)}
      />
      <p className="text-sm/[1rem]">{label || name}</p>
    </div>
  )
}
