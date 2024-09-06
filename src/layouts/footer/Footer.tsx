import { Socials } from '@components/socials/Socials'
import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { HeaderMenu, MobileFooterMenu } from '@layouts/header/HeaderMenu'
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
        className={cn('flex justify-center flex-col gap-12 items-center', className)}
      >
        <Link to="/">
          <Logo className="size-9 overflow-visible" />
        </Link>
        <MobileFooterMenu />
        <Socials
          classNames={{
            icon: '[&_path]:fill-text-80 opacity-100',
            container: 'gap-8',
          }}
        />
      </footer>
    )
  }
  return (
    <footer
      className={cn('flex justify-center flex-col gap-[7rem] items-center', className)}
    >
      <div className="grid w-full grid-cols-3 items-start">
        <Link to="/" className="flex-[0.5] justify-self-start">
          <Logo className="h-[1.5625rem] w-[4.1875rem]" />
        </Link>
        <HeaderMenu className="place-self-center" />
      </div>
      <Socials
        classNames={{
          icon: 'size-[3.5rem] [&_path]:fill-[#323949]',
        }}
      />
    </footer>
  )
}
