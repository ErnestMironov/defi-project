import type { ComponentProps } from 'react'
import { Outlet } from 'react-router-dom'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg px-4 pt-[0.69rem] lg:px-20 lg:pt-[1.44rem]">
      <header>header</header>
      <main className="mt-[1.96rem] flex-1 lg:mt-0 lg:pb-28">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  )
}
