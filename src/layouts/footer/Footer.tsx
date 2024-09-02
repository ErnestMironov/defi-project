import { Socials } from '@components/socials/Socials'
import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { HeaderMenu } from '@layouts/header/HeaderMenu'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface MobileFooterProperties extends ComponentProps<'div'> {}

export const Footer = (props: MobileFooterProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const { className } = props
  if (isBelowDesktop) {
    return (
      <footer
        className={cn('flex justify-center flex-col gap-[3rem] items-center', className)}
      >
        <Link to="/">
          <Logo className="size-[2.20419rem] overflow-visible" />
        </Link>
        <HeaderMenu className="gap-6 justify-self-center" />
        <Socials />
      </footer>
    )
  }
  return (
    <footer
      className={cn('flex justify-center flex-col gap-[4.06rem] items-center', className)}
    >
      <div className="grid w-full grid-cols-[1fr_2fr_1fr] items-start">
        <Link to="/" className="flex-[0.5] justify-self-start">
          <Logo className="h-[1.5625rem] w-[4.1875rem]" />
        </Link>
        <HeaderMenu className="flex-[0.5] gap-[3.75rem] justify-self-center" />
      </div>
      <Socials
        classNames={{
          icon: 'size-[3.5rem] [&_path]:fill-[#323949]',
        }}
      />
    </footer>
  )
}
