import type { ComponentProps } from 'react'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ children, ...rest }: HeaderProperties) => {
  return <header {...rest}>{children}</header>
}
