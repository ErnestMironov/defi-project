import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import type { ComponentProps } from 'react'
import { NavLink, useParams } from 'react-router-dom'

interface BreadcrumbsProperties extends ComponentProps<'div'> {}

export const Breadcrumbs = (_props: BreadcrumbsProperties) => {
  const { symbol } = useParams()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NavLink to="/analytics">Analytics</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{symbol}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
