import { SectionTitle } from '@components/section/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { AdminTable } from './admin/AdminTable'
import { IncentivesTable } from './incentives/IncentivesTable'
import { ReportsTable } from './reports/ReportsTable'

interface SystemActionsProperties extends ComponentProps<'div'> {}

export const SystemActions = (props: SystemActionsProperties) => {
  const { className, ...rest } = props
  return (
    <section className={cn('', className)} {...rest}>
      <SectionTitle>System Actions</SectionTitle>
      <Tabs defaultValue="admin" className="mt-12">
        <TabsList>
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
