import ArrowTopRight from '@assets/icons/arrow-top-right.svg'
import AnalyticsIcon from '@assets/icons/menu/analytics.svg'
import DepositIcon from '@assets/icons/menu/deposit.svg'
import DocsIcon from '@assets/icons/menu/docs.svg'
import PortfolioIcon from '@assets/icons/menu/portfolio.svg'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'

enum MenuVisibility {
  Desktop = 'desktop',
  Mobile = 'mobile',
  DesktopAndMobile = 'desktop-and-mobile',
}

export interface IMenuItem {
  href: string
  label: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  linkType?: 'internal' | 'external'
  visibility?: MenuVisibility
  iconClassName?: string
}

export const useMenu = () => {
  return useMemo(() => {
    return {
      deposit: {
        href: ROUTES.DEPOSIT,
        label: 'Deposit',
        icon: DepositIcon,
        linkType: 'internal',
        visibility: MenuVisibility.DesktopAndMobile,
        iconClassName: 'size-8 [&_path]:stroke-current',
      },
      analytics: {
        href: ROUTES.ANALYTICS,
        label: 'Analytics',
        icon: AnalyticsIcon,
        linkType: 'internal',
        visibility: MenuVisibility.DesktopAndMobile,
        iconClassName: 'size-8 [&_path]:stroke-current',
      },
      portfolio: {
        href: ROUTES.PORTFOLIO,
        label: 'Portfolio',
        icon: PortfolioIcon,
        linkType: 'internal',
        visibility: MenuVisibility.Mobile,
        iconClassName: 'size-8 [&_path]:stroke-current',
      },
      docs: {
        href: 'https://docs.maat.finance/',
        label: 'Docs',
        icon: DocsIcon,
        linkType: 'external',
        visibility: MenuVisibility.DesktopAndMobile,
        iconClassName: 'size-8 [&_path]:stroke-current',
        externalIcon: ({ className, ...rest }: ComponentProps<'svg'>) => (
          <ArrowTopRight
            {...rest}
            className={cn(className, 'size-[1em] relative bottom-[0.06rem]')}
          />
        ),
      },
    }
  }, [])
}

export const useMenuArray = () => {
  const menu = useMenu()
  return Object.values(menu) as IMenuItem[]
}

export const useMobileMenuArray = () => {
  const menuItems = useMenuArray()
  return menuItems.filter(
    (item) =>
      item.visibility === MenuVisibility.Mobile ||
      item.visibility === MenuVisibility.DesktopAndMobile,
  )
}

export const useDesktopMenuArray = () => {
  const menuItems = useMenuArray()
  return menuItems.filter(
    (item) =>
      item.visibility === MenuVisibility.Desktop ||
      item.visibility === MenuVisibility.DesktopAndMobile,
  )
}
