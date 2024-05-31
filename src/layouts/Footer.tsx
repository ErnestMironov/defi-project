import type { ComponentProps } from 'react'

interface FooterProperties extends ComponentProps<'div'> {}

export const Footer = ({ children, ...rest }: FooterProperties) => {
  return <footer {...rest}>{children}</footer>
}
