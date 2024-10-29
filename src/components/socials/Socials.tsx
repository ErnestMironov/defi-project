import Discord from '@assets/icons/discord.svg'
import GitHub from '@assets/icons/github.svg'
import Medium from '@assets/icons/medium.svg'
import Twitter from '@assets/icons/twitter.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface SocialsProperties extends ComponentProps<'div'> {
  classNames?: {
    container?: string
    icon?: string
  }
}

// const SOCIALS = [GitHub, Discord, Twitter, Telegram, Medium]
const SOCIALS = [
  {
    name: 'GitHub',
    icon: GitHub,
  },
  {
    name: 'Discord',
    icon: Discord,
  },
  {
    name: 'Twitter',
    icon: Twitter,
  },
  {
    name: 'Medium',
    icon: Medium,
  },
]

export const Socials = (props: SocialsProperties) => {
  const { className, classNames } = props
  return (
    <div className={cn('flex items-center gap-8', classNames?.container, className)}>
      {SOCIALS.map((social, i) => (
        <social.icon
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

export const SocialsSidebar = (props: SocialsProperties) => {
  const { className, classNames } = props
  return (
    <div
      className={cn('flex flex-col items-start gap-5', classNames?.container, className)}
    >
      {SOCIALS.map((social, i) => (
        <div className="flex items-center gap-3">
          <social.icon key={i} className={cn(classNames?.icon)} />
          <p className="text-[1.25rem] leading-[120%] text-text-90">{social.name}</p>
        </div>
      ))}
    </div>
  )
}
