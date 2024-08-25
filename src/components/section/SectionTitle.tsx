import { Logo } from '@components/ui/logo'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface SectionTitleProperties extends ComponentProps<'div'> {}

export const SectionTitle = (props: SectionTitleProperties) => {
  const { className, children, ...rest } = props
  return (
    <div className={cn(className, 'flex items-center gap-6')} {...rest}>
      <Logo className="h-[1.5625rem] w-[4.1875rem]" />
      <h2 className="text-[2rem]/[2.4rem] uppercase">{children}</h2>
    </div>
  )
}
