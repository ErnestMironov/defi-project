import { cn } from '@utils/cn'
import React from 'react'

import { TokenIconComponent } from '.'

/**
 * Interface for the properties of the TokenWithNetwork component.
 */
interface TokenWithNetworkProperties extends React.HTMLAttributes<HTMLDivElement> {
  /** The symbol of the token. */
  symbol?: string | null
  /** The network of the token. */
  network?: number | string | null
  /** The position of the network icon relative to the token icon. */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-right'
  /** Custom class names for the token and network icons. */
  classNames?: { token?: string; network?: string }
  /** The width of the token icon. */
  width?: string
  /** Fallback URL for the token logo. */
  tokenLogoFallback?: string
}

/**
 * A component that displays a token icon with an overlayed network icon.
 *
 * @param {TokenWithNetworkProperties} props - The properties for the component.
 * @param {string} symbol - The symbol of the token.
 * @param {string} network - The network of the token.
 * @param {string} position - The position of the network icon relative to the token icon.
 * @param {object} classNames - Custom class names for the token and network icons.
 * @param {string} width - The width of the token icon.
 * @returns {JSX.Element | null} The rendered component or null if network or symbol is not provided.
 */
export const TokenWithNetwork = (
  props: TokenWithNetworkProperties,
): JSX.Element | null => {
  const { network, symbol, position, classNames, className, width, ...rest } = props
  if (!network || !symbol) return null

  // Determine the position class name based on the position prop
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
        return '-bottom-[10%] -right-[10%]'
      }
    }
  })()

  return (
    <div className={cn('relative', className)} {...rest}>
      <TokenIconComponent
        symbol={symbol}
        style={{ width, height: width }}
        tokenLogoFallback={props.tokenLogoFallback}
        className={cn('size-6', classNames?.token)}
      />
      <div
        className={cn(
          'scale-[0.8] absolute flex w-1/2  items-center justify-center rounded-full bg-cards !overflow-hidden',
          positionClassName,
          classNames?.network,
        )}
      >
        <TokenIconComponent
          symbol={network}
          className={cn(
            'size-full aspect-square overflow-visible ring-2 ring-cards rounded-full',
          )}
        />
      </div>
    </div>
  )
}
