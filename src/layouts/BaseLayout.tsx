import type { ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './Header'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  return (
    <div className="bg-primary-bg flex min-h-screen flex-col px-[6.25rem]">
      <Header className="flex py-12 [&>*]:flex-1" />
      <main className="mt-[1.96rem] flex-1 lg:mt-0 lg:pb-28">
        <Outlet />
      </main>
    </div>
  )
}
