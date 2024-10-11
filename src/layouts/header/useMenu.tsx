import ArrowTopRight from '@assets/icons/arrow-top-right.svg'
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
}

export const useShortMenuArray = (includePortfolio: boolean = false) => {
  const menu = useMemo(() => {
    return {
      deposit: {
        href: ROUTES.DEPOSIT,
        label: 'Deposit',
      },
      analytics: {
        href: ROUTES.ANALYTICS,
        label: 'Analytics',
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
  const portfolio: IMenuItem = {
    href: ROUTES.PORTFOLIO,
    label: 'Portfolio',
  }
  const docs: IMenuItem = {
    href: 'https://docs.maat.finance/',
    label: 'Docs',
    src: ({ className, ...rest }: ComponentProps<'svg'>) => (
      <ArrowTopRight
        {...rest}
        className={cn(className, 'size-[1em] relative bottom-[0.06rem]')}
      />
    ),
  }
  const resultMenu = Object.values(menu) as IMenuItem[]
  if (includePortfolio) {
    resultMenu.push(portfolio as IMenuItem)
  }
  resultMenu.push(docs)
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
