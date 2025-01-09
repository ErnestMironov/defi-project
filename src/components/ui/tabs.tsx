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
      'inline-flex items-center gap-8 max-lg:gap-2 justify-center text-text-60',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'base' | 'unstyled' | 'underline'
  }
>(({ className, variant = 'base', ...props }, reference) => (
  <TabsPrimitive.Trigger
    ref={reference}
    className={cn(
      variant === 'unstyled' &&
        'data-[state=active]:text-text-1100 text-[rgba(133, 133, 169, 0.60)] text-2xl max-lg:text-lg/[1.35rem]',
      variant === 'base' &&
        'uppercase bg-[rgba(153,_152,_184,_0.10)] rounded-[1.25rem] max-lg:rounded-[0.75rem] p-6 max-lg:py-4 max-lg:px-[2.5rem] text-[1.25rem] max-lg:text-base font-bold data-[state=active]:bg-main-15 data-[state=active]:text-main-100',
      variant === 'underline' &&
        'text-gray-80 data-[state=active]:text-main-100 border-transparent border-b-2 data-[state=active]:border-main-100 max-lg:text-sm',

      'inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
    className={cn('focus-visible:outline-none', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
