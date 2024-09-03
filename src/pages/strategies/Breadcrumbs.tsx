import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'

interface BreadcrumbsProperties extends ComponentProps<'div'> {}

export const Breadcrumbs = (props: BreadcrumbsProperties) => {
  const { className } = props
  return (
    <Breadcrumb className={cn('', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NavLink to="/analytics">Analytics</NavLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Strategies</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
