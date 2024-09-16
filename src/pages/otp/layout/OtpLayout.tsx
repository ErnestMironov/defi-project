import { type ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

import { OtpHeader } from './OtpHeader'

interface OtpLayoutProperties extends ComponentProps<'div'> {}

export const OtpLayout = (_props: OtpLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col bg-bg px-[6.25rem] max-lg:px-4">
      <OtpHeader className="relative z-[2] mt-4 lg:mt-[2.06rem]" />
      <main className="flex-1 pb-10 lg:mt-0 lg:pb-[9.44rem]">
        <Outlet />
      </main>
    </div>
  )
}
