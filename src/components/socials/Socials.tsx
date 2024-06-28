import Discord from '@assets/icons/discord.svg'
import GitHub from '@assets/icons/github.svg'
import Twitter from '@assets/icons/twitter.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface SocialsProperties extends ComponentProps<'div'> {}

const SOCIALS = [GitHub, Twitter, Discord]

export const Socials = (props: SocialsProperties) => {
  const { className } = props
  return (
    <div className={cn('flex items-center gap-8', className)}>
      {SOCIALS.map((Icon, i) => (
        <Icon key={i} className="size-10 overflow-visible [&_path]:fill-gray-50" />
      ))}
    </div>
  )
}
