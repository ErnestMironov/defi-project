import ArrowTopRight from '@assets/icons/arrow-top-right.svg'
import AnalyticsLottie from '@assets/lottie/MAAT_Icon_Analytics.json'
import DepositLottie from '@assets/lottie/MAAT_Icon_Deposit.json'
import DocsLottie from '@assets/lottie/MAAT_Icon_Docs.json'
import PortfolioLottie from '@assets/lottie/MAAT_Icon_Portfolio.json'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'

export interface IMenuItem {
  href: string
  label: string
  src?: React.FC<React.SVGProps<SVGSVGElement>>
  callback?: () => void
  dropdown?: IMenuItem[]
  type?: 'link' | 'dropdown' | 'button'
  animationData?: any
  animationClassName?: string
}

export interface IMenuItemWithoutLink extends Omit<IMenuItem, 'href' | 'callback'> {
  callback?: () => void
}

export const useShortMenuArray = (includePortfolio: boolean = false) => {
  const menu = useMemo(() => {
    return {
      deposit: {
        href: ROUTES.DEPOSIT,
        label: 'Deposit',
        animationData: DepositLottie,
        animationClassName: 'size-8',
      },
      analytics: {
        href: ROUTES.ANALYTICS,
        label: 'Analytics',
        animationData: AnalyticsLottie,
        animationClassName: 'size-8',
        dropdown: [
          {
            href: ROUTES.TOKENS,
            label: 'Tokens',
          },
          {
            href: ROUTES.STRATEGIES,
            label: 'Strategies',
          },
          {
            href: ROUTES.TRANSACTIONS,
            label: 'Transactions',
          },
        ],
      },
    }
  }, [])
  const portfolio: IMenuItemWithoutLink = {
    label: 'Portfolio',
    type: 'button',
    animationData: PortfolioLottie,
    animationClassName: 'size-8',
  }
  const documentation: IMenuItem = {
    href: 'https://docs.maat.finance/',
    label: 'Docs',
    src: ({ className, ...rest }: ComponentProps<'svg'>) => (
      <ArrowTopRight
        {...rest}
        className={cn(className, 'size-[1em] relative bottom-[0.06rem]')}
      />
    ),
    animationData: DocsLottie,
    animationClassName: 'size-8',
  }
  const resultMenu = Object.values(menu) as IMenuItem[]
  if (includePortfolio) {
    resultMenu.push(portfolio as IMenuItem)
  }
  resultMenu.push(documentation)
  return resultMenu
}

export const useMenuArray = () => {
  const menu = useMenu()

  return Object.values(menu) as IMenuItem[]
}

export const useMenu = () => {
  return useMemo(() => {
    return {
      deposit: {
        href: ROUTES.DEPOSIT,
        label: 'Deposit',
      },
      analytics: {
        href: ROUTES.ANALYTICS,
        label: 'Analytics',
      },
      tokens: {
        href: ROUTES.TOKENS,
        label: 'Tokens',
      },
      strategies: {
        href: ROUTES.STRATEGIES,
        label: 'Strategies',
      },
      transactions: {
        href: ROUTES.TRANSACTIONS,
        label: 'Transactions',
      },
      docs: {
        href: 'https://docs.maat.finance/',
        label: 'Docs',
        src: ({ className, ...rest }: ComponentProps<'svg'>) => (
          <ArrowTopRight
            {...rest}
            className={cn(className, 'size-[1em] relative bottom-[0.06rem]')}
          />
        ),
      },
    }
  }, [])
}
