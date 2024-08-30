import { SectionTitle } from '@components/section/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { IncentiveMobileWithFilters } from '@modules/transactions/incentive/IncentiveMobileWithFilters'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { AdminTable } from './admin/AdminTable'
import { AdminActionMobileWithFilters } from './admin/mobile/AdminActionMobileWithFilters'
import { IncentivesTable } from './incentives/IncentivesTable'
import { ReportActionMobileWithFilters } from './reports/mobile/ReportActionMobileWithFilters'
import { ReportsTable } from './reports/ReportsTable'

interface SystemActionsProperties extends ComponentProps<'div'> {}

export const SystemActions = (props: SystemActionsProperties) => {
  const { className, ...rest } = props
  return (
    <section className={cn('', className)} {...rest}>
      <SectionTitle>System Actions</SectionTitle>
      <Tabs defaultValue="admin" className="mt-12">
        <TabsList className="*:w-[12.5rem]">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <AdminTable />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentivesTable />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTable />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export const SystemActionsMobile = (props: SystemActionsProperties) => {
  const { className, ...rest } = props
  return (
    <section className={cn('', className)} {...rest}>
      <SectionTitle>System Actions</SectionTitle>
      <Tabs defaultValue="admin" className="mt-4">
        <TabsList className="grid grid-cols-3 *:max-lg:text-[0.875rem]">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <AdminActionMobileWithFilters />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentiveMobileWithFilters />
        </TabsContent>
        <TabsContent value="reports">
          <ReportActionMobileWithFilters />
        </TabsContent>
      </Tabs>
    </section>
  )
}
