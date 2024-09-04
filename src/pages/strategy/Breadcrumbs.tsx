import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import { ROUTES } from '@routes/routes'
import type { ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'

interface BreadcrumbsProperties extends ComponentProps<'div'> {}

export const Breadcrumbs = (_props: BreadcrumbsProperties) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NavLink to={ROUTES.ANALYTICS}>Analytics</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <NavLink to={ROUTES.STRATEGIES}>Strategies</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Strategy</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
