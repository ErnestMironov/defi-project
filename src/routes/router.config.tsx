import { BaseLayout } from '@layouts/BaseLayout'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import { ROUTES } from './routes'

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route Component={BaseLayout}>
      <Route
        path={ROUTES.HOME}
        lazy={async () => {
          const { Landing } = await import('@pages/landing/Landing')
          return {
            Component: Landing,
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
