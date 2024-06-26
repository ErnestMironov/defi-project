import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
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

export const IconWithLabelComponent = ({
  symbol,
  className,
  label,
  ...rest
}: TokenIconProperties & { label?: string }) => {
  const asset = useTokenAsset(symbol)
  if (!asset) return
  const { TokenIcon } = asset
  return (
    <div className={cn('flex items-center gap-2 min-w-max', className)}>
      <TokenIcon {...rest} className={clsx(className, 'overflow-visible')} />
      <div className="leading-normal">{label || symbol}</div>
    </div>
  )
}
