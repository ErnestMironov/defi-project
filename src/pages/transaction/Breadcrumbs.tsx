import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import type { ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'

interface BreadcrumbsProperties extends ComponentProps<'div'> {}

export const Breadcrumbs = (_props: BreadcrumbsProperties) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NavLink to="/analytics">Analytics</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <NavLink to="/transactions">Transactions</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Event page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
