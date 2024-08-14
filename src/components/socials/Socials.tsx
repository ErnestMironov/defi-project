import Discord from '@assets/icons/discord.svg'
import GitHub from '@assets/icons/github.svg'
import Medium from '@assets/icons/medium.svg'
import Telegram from '@assets/icons/telegram.svg'
import Twitter from '@assets/icons/twitter.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface SocialsProperties extends ComponentProps<'div'> {
  classNames?: {
    container?: string
    icon?: string
  }
}

const SOCIALS = [GitHub, Discord, Twitter, Telegram, Medium]

export const Socials = (props: SocialsProperties) => {
  const { className, classNames } = props
  return (
    <div className={cn('flex items-center gap-8', classNames?.container, className)}>
      {SOCIALS.map((Icon, i) => (
        <Icon
          key={i}
          className={cn(
            'size-10 overflow-visible [&_path]:fill-gray-50 opacity-90 cursor-pointer hover:opacity-100',
            classNames?.icon,
          )}
        />
      ))}
    </div>
  )
}
