import ArrowRight from '@assets/icons/arrow-right.svg'
import { ROUTES } from '@routes/routes'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface IMenuItem {
  href: string
  label: string
  src?: React.FC<React.SVGProps<SVGElement>>
  callback?: () => void
}

interface IMenu {
  dashboard: IMenuItem
  usdt: IMenuItem
  usdc: IMenuItem
  docs: IMenuItem
}

const scrollToTop = () => {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const useMenu = (): IMenu => {
  const { t } = useTranslation()

  return useMemo(() => {
    return {
      main: {
        href: ROUTES.HOME,
        label: t('Menu.main'),
        callback: scrollToTop,
      },
      dashboard: {
        href: ROUTES.DASHBOARD,
        label: t('Menu.dashboard'),
      },
      usdt: {
        href: ROUTES.USDT,
        label: 'USDT',
      },
      usdc: {
        href: ROUTES.USDC,
        label: 'USDC',
      },
      docs: {
        href: ROUTES.DOCS,
        label: t('Menu.docs'),
        src: ArrowRight,
      },
    }
  }, [t])
}

export const useMenuArray = () => {
  const menu = useMenu()

  return Object.values(menu).filter((item) => item.href !== ROUTES.HOME) as IMenuItem[]
}
