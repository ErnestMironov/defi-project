import BgDark from '@assets/images/background-dark.jpg'
import BgLight from '@assets/images/background-light.jpg'
import { useTheme } from '@modules/theme/ThemeProvider'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Header } from './header/Header'

interface BaseLayoutProperties extends ComponentProps<'div'> {}

export const BaseLayout = (_props: BaseLayoutProperties) => {
  const { theme } = useTheme()
  const { pathname } = useLocation()
  const customBgPage = [ROUTES.PORTFOLIO, ROUTES.DEPOSIT, ROUTES.POINTS].includes(
    pathname as never,
  )

  return (
    <>
      <div className="flex min-h-screen flex-col px-[6.25rem] max-lg:px-4">
        <Header className="mt-4 lg:mt-[2.06rem]" />
        <main className="flex-1 lg:mt-0">
          <Outlet />
        </main>
      </div>
      {customBgPage && (
        <img
          src={theme === 'light' ? BgLight : BgDark}
          alt="background-light"
          className={cn(
            'pointer-events-none fixed inset-0 z-[-1] h-screen w-screen bg-bg object-cover',
            theme !== 'light' && 'opacity-70',
          )}
        />
      )}
    </>
  )
}
