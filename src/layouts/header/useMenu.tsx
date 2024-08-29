import ArrowTopRight from '@assets/icons/arrow-top-right.svg'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { useMemo } from 'react'

export interface IMenuItem {
  href: string
  label: string
  src?: React.FC<React.SVGProps<SVGSVGElement>>
  callback?: () => void
}

interface IMenu {
  analytics: IMenuItem
  deposit: IMenuItem
  docs: IMenuItem
}

export const useMenu = (): IMenu => {
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
        src: ({ className, ...rest }) => (
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
