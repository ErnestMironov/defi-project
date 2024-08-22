import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@utils/cn'
import * as React from 'react'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, reference) => (
  <TabsPrimitive.List
    ref={reference}
    className={cn(
      'inline-flex items-center gap-4 justify-center rounded-md text-gray-80',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, reference) => (
  <TabsPrimitive.Trigger
    ref={reference}
    className={cn(
      'inline-flex uppercase w-[12.5rem] bg-[rgba(153,_152,_184,_0.10)] items-center justify-center whitespace-nowrap rounded-[1.25rem] p-6 text-[1.25rem] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main-15 data-[state=active]:text-main-100',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, reference) => (
  <TabsPrimitive.Content
    ref={reference}
    className={cn('mt-6 focus-visible:outline-none', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
