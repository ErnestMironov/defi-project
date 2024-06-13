import type { ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { Header } from './Header'
import { HeaderMenu } from './header/HeaderMenu'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col px-[6.25rem]">
      <Header className="flex py-12 [&>*]:flex-1">
        <div />
        <HeaderMenu />
        <div className="flex flex-1">
          <div className="ml-auto">0x5h9...w91</div>
        </div>
      </Header>
      <main className="mt-[1.96rem] flex-1 lg:mt-0 lg:pb-28">
        <Outlet />
      </main>
      <Footer>footer</Footer>
    </div>
  )
}
