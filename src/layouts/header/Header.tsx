import PointIcon from '@assets/icons/point-icon.svg'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) {
    return <MobileHeader className={className} {...rest} />
  }
  return (
    <>
      <div className="h-16" />
      <header
        {...rest}
        className={clsx(
          'fixed left-0 top-0 z-50 flex w-full items-center justify-between px-[6.25rem]',
          className,
        )}
      >
        <div className="h-16">
          <Sidebar />
        </div>
        <button
          type="button"
          className="flex items-center gap-2
rounded-[12.5rem] bg-[rgba(153,_152,_184,_0.10)] px-6 py-4 text-[1.25rem] leading-none tracking-[-0.0125rem] text-gray-80"
        >
          Your balance:
          <span className="text-white">354</span>
          <PointIcon className="relative -top-0.5 size-6" />
        </button>
      </header>
    </>
  )
}
