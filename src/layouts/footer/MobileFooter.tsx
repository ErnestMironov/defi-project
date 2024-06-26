import { Socials } from '@components/socials/Socials'
import { Logo } from '@components/ui/logo'
import { HeaderMenu } from '@layouts/header/HeaderMenu'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface MobileFooterProperties extends ComponentProps<'div'> {}

export const MobileFooter = (props: MobileFooterProperties) => {
  const { className } = props
  return (
    <div
      className={cn('flex justify-center flex-col gap-[3rem] items-center', className)}
    >
      <Link to="/">
        <Logo className="size-[2.20419rem] overflow-visible" />
      </Link>
      <HeaderMenu className="gap-6 justify-self-center" />
      <Socials />
    </div>
  )
}
