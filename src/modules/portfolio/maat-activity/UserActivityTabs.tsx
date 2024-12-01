import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { UserActivity } from './UserActivity'
import { UserTokens } from './UserTokens'

interface UserActivityTabsProperties extends ComponentProps<'div'> {
  value: number
}

export const UserActivityTabs = (props: UserActivityTabsProperties) => {
  const { className, value, ...rest } = props

  return (
    <div className={cn('flex flex-col gap-4', className)} {...rest}>
      <Tabs defaultValue="tokens" className="">
        <TabsList className=" flex w-full justify-start gap-4 border-b  px-6">
          <TabsTrigger
            variant="unstyled"
            value="tokens"
            className="py-4 text-md data-[state='active']:border-b data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
            disabled={value <= 0}
          >
            Assets
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            variant="unstyled"
            className="py-4 text-md data-[state='active']:border-b data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
            disabled={value <= 0}
          >
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">
          <UserTokens />
        </TabsContent>
        <TabsContent value="activity">
          <UserActivity />
        </TabsContent>
      </Tabs>
    </div>
  )
}
