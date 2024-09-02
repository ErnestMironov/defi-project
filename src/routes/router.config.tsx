import { BaseLayout } from '@layouts/BaseLayout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  ScrollRestoration,
} from 'react-router-dom'

import { ROUTES } from './routes'

function Root() {
  return (
    <>
      <ScrollRestoration />
      <BaseLayout />
    </>
  )
}

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route Component={Root}>
      <Route
        path={ROUTES.DEPOSIT}
        lazy={async () => {
          const { Deposit } = await import('@pages/deposit/Deposit')
          return {
            Component: Deposit,
          }
        }}
      />
      <Route
        path={ROUTES.ANALYTICS}
        lazy={async () => {
          const { Analytics } = await import('@pages/analytics/Analytics')
          console.log('🚀 ~ lazy={ ~ Landing:', Analytics)
          return {
            Component: Analytics,
          }
        }}
      />
      <Route
        path={ROUTES.STRATEGIES}
        lazy={async () => {
          const { StrategiesPage: Strategies } = await import(
            '@pages/strategies/Strategies'
          )
          console.log('🚀 ~ lazy={ ~ Landing:', Strategies)
          return {
            Component: Strategies,
          }
        }}
      />
      <Route
        path={ROUTES.STRATEGY}
        lazy={async () => {
          const { Strategy } = await import('@pages/strategy/Strategy')
          return {
            Component: Strategy,
          }
        }}
      />
      <Route
        path={ROUTES.TOKENS}
        lazy={async () => {
          return {
            loader: ({ request }) => {
              const url = new URL(request.url)
              if (url.pathname === ROUTES.TOKENS) {
                return redirect(`${ROUTES.TOKENS}/USDC`)
              }
              return null
            },
          }
        }}
      />
      <Route
        path={ROUTES.TOKEN}
        lazy={async () => {
          const { TokenPage } = await import('@pages/token/TokenPage')
          return {
            Component: TokenPage,
          }
        }}
      />
      <Route
        path={ROUTES.TRANSACTIONS}
        lazy={async () => {
          const { TransactionsPage } = await import(
            '@pages/transactions/TransactionsPage'
          )
          return {
            Component: TransactionsPage,
          }
        }}
      />
      <Route
        path={ROUTES.TRANSACTION}
        lazy={async () => {
          const { TransactionPage } = await import('@pages/transaction/TransactionPage')
          return {
            Component: TransactionPage,
          }
        }}
      />
    </Route>

    <Route
      path="*"
      lazy={async () => {
        const { NotFound } = await import('@pages/404/NotFound')
        return {
          Component: NotFound,
        }
      }}
    />
  </Route>,
)

export const router = createBrowserRouter(routes)
