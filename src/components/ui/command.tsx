import Check from '@assets/icons/check.svg'
import { Dialog, DialogContent, type DialogProps } from '@radix-ui/react-dialog'
import { cn } from '@utils/cn'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import * as React from 'react'

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, reference) => (
  <CommandPrimitive
    ref={reference}
    className={cn('flex size-full flex-col rounded-md text-text', className)}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProperties extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProperties) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, reference) => (
  <div className="flex items-center border-b border-stroke-100 px-3">
    <Search className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={reference}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400',
        className,
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, reference) => (
  <CommandPrimitive.List ref={reference} className={cn('', className)} {...props} />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, reference) => (
  <CommandPrimitive.Empty
    ref={reference}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, reference) => (
  <CommandPrimitive.Group
    ref={reference}
    className={cn('*:flex *:flex-col *:gap-1', className)}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, reference) => (
  <CommandPrimitive.Separator
    ref={reference}
    className={cn('-mx-1 h-px bg-gray-50', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, reference) => (
  <CommandPrimitive.Item
    ref={reference}
    className={cn(
      'group relative flex w-full p-3 cursor-pointer select-none rounded-[0.75rem] items-center justify-between gap-[0.38rem] text-sm outline-none',
      'hover:bg-[#8585A914] data-[select=true]:bg-[#8585A914]',
      className,
    )}
    {...props}
  >
    {props.children}
    <Check
      className={cn('size-[1.125rem] opacity-0 group-data-[select=true]:opacity-100')}
    />
  </CommandPrimitive.Item>
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400',
        className,
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
