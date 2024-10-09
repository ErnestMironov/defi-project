import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { UserActivity } from './UserActivity'
import { UserTokens } from './UserTokens'

interface UserActivityTabsProperties extends ComponentProps<'div'> {}

export const UserActivityTabs = (props: UserActivityTabsProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn('flex flex-col gap-4', className)} {...rest}>
      <Tabs defaultValue="tokens">
        <TabsList className="gap-4">
          <TabsTrigger
            variant="unstyled"
            value="tokens"
            className="data-[state='active']:text-text"
          >
            Tokens
          </TabsTrigger>
          <TabsTrigger value="activity" variant="unstyled">
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
