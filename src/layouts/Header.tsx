import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { HeaderMenu } from './header/HeaderMenu'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  return (
    <header {...rest} className={clsx('flex items-center justify-between', className)}>
      <Link to="/">
        <Logo fill="#060606" />
      </Link>
      <HeaderMenu />
      <div />
    </header>
  )
}
