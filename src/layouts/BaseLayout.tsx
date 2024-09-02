import type { ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './header/Header'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col bg-bg px-[6.25rem] max-lg:px-4">
      <Header className="mt-4 lg:mt-[2.06rem]" />
      <main className="flex-1 pb-[4.62rem] lg:mt-0 lg:pb-[9.44rem]">
        <Outlet />
      </main>
    </div>
  )
}
