import { type ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './header/Header'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col px-[6.25rem] max-lg:px-4 ">
      <Header className="mt-4 lg:mt-[2.06rem]" />
      <main className="flex-1 lg:mt-0">
        <Outlet />
      </main>
    </div>
  )
}
