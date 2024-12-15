import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { UserActivity } from './UserActivity'
import { UserTokens } from './UserTokens'

interface UserActivityTabsProperties extends ComponentProps<'div'> {
  value: number
}

export const UserActivityTabs = (props: UserActivityTabsProperties) => {
  const { className, value, ...rest } = props
  const [activeTab, setActiveTab] = useState('tokens')
  return (
    <div className={cn('flex flex-col gap-4', className)} {...rest}>
      <Tabs defaultValue="tokens" className="" onValueChange={setActiveTab}>
        <TabsList className=" flex w-full justify-between border-b  border-stroke-100 px-6 max-md:px-4">
          <div className="flex gap-4">
            <TabsTrigger
              variant="unstyled"
              value="tokens"
              className="py-3 text-md leading-6 text-text-2100  data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
              disabled={value <= 0}
            >
              Assets
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              variant="unstyled"
              className="py-3 text-md text-text-2100 data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
              disabled={value <= 0}
            >
              Activity
            </TabsTrigger>
          </div>
          {activeTab === 'activity' && <a href="##">See all</a>}
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
