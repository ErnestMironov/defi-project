import { cn } from '@utils/cn'
import React from 'react'

import { TokenIconComponent } from '.'

interface TokenWithNetworkProperties extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string | null
  network?: string | null
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-right'
  classNames?: { token?: string; network?: string }
  width?: string
}

export const TokenWithNetwork = (props: TokenWithNetworkProperties) => {
  const { network, symbol, position, classNames, className, width, ...rest } = props
  if (!network || !symbol) return null

  const positionClassName = (() => {
    switch (position) {
      case 'top': {
        return 'bottom-0.5 right-0.5'
      }
      case 'bottom-right': {
        return '-bottom-[10%] -right-[10%]'
      }
      case 'left': {
        return 'right-0.5 top-0.5'
      }
      case 'top-right': {
        return '-right-1.5 -top-1'
      }
      default: {
        return 'bottom-0.5 right-0.5'
      }
    }
  })()

  return (
    <div className={cn('relative', className)} {...rest}>
      <TokenIconComponent
        symbol={symbol}
        style={{ width, height: width }}
        className={cn('', classNames?.token)}
      />
      <div
        className={cn(
          'scale-[0.8] absolute flex w-1/2 aspect-square items-center justify-center rounded-full bg-white overflow-visible',
          positionClassName,
          classNames?.network,
        )}
      >
        <TokenIconComponent
          symbol={network}
          className={cn(
            'size-full aspect-square overflow-visible ring-2 ring-white rounded-full',
          )}
        />
      </div>
    </div>
  )
}
