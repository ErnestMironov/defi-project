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
      {value ? (
        <Tabs defaultValue="tokens" className="">
          <TabsList className=" flex w-full justify-start gap-4 border-b">
            <TabsTrigger
              variant="unstyled"
              value="tokens"
              className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              variant="unstyled"
              className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
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
      ) : (
        <UserTokens />
      )}
    </div>
  )
}
