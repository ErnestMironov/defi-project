import { ROUTES } from '@routes/routes'
import { useMemo } from 'react'

export interface IMenuItem {
  href: string
  label: string
  src?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
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
      docs: {
        href: 'https://docs.maat.finance/',
        label: 'Docs',
        src: (props: React.SVGProps<SVGSVGElement>) => (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M9.66406 9.63916L19.8708 9.63916L19.8708 20.0349"
              stroke="#323949"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
            <path
              d="M9.69141 20.0068L19.2255 10.2962"
              stroke="#323949"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    }
  }, [])
}

export const useMenuArray = () => {
  const menu = useMenu()

  return Object.values(menu) as IMenuItem[]
}
