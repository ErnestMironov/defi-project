import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

interface OtpHeaderProperties extends ComponentProps<'div'> {}

export const OtpHeader = ({ className }: OtpHeaderProperties) => {
  return (
    <header className={clsx('grid grid-cols-2 items-center justify-between', className)}>
      <Logo className="h-[1.36063rem] w-[3.655rem] shrink-0 fill-text max-lg:size-9" />
      {/* <ThemeTogglerV1 className="justify-self-end max-lg:size-8 max-lg:justify-self-end max-lg:rounded-lg max-lg:p-2" /> */}
    </header>
  )
}
