import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

import { HeaderMenu } from './header/HeaderMenu'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  return (
    <header
      {...rest}
      className={clsx(
        'flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-100',
        className,
      )}
    >
      <Logo fill="white" />
      <HeaderMenu />
      <div />
    </header>
  )
}
