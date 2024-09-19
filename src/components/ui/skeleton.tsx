import { cn } from '@utils/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-md bg-slate-200/80 dark:bg-slate-700',
        'relative overflow-hidden',
        'after:absolute after:inset-[-20%]',
        'after:translate-x-[-100%]',
        'after:animate-shimmer',
        'after:bg-gradient-to-r after:rotate-[30deg]',
        'after:from-transparent after:via-slate-300/30 dark:after:via-slate-600/30 after:to-transparent',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
