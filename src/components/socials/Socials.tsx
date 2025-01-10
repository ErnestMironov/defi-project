import Discord from '@assets/icons/discord.svg'
import GitHub from '@assets/icons/github.svg'
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
    link: 'https://github.com/maat-protocol',
    icon: GitHub,
  },
  {
    name: 'Discord',
    icon: Discord,
    link: 'https://discord.gg/5srBUPbW',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    link: 'https://x.com/maatprotocol',
  },
]

export const Socials = (props: SocialsProperties) => {
  const { className, classNames } = props
  return (
    <div
      className={cn(
        'flex items-center gap-8 justify-between p-3',
        classNames?.container,
        className,
      )}
    >
      {SOCIALS.map((social) => (
        <a target="_blank" href={social.link} key={social.link} rel="noreferrer">
          <social.icon
            className={cn(
              'size-6 max-md:size-8 overflow-visible [&_path]:fill-gray-50 opacity-90 cursor-pointer hover:opacity-100',
              classNames?.icon,
            )}
          />
        </a>
      ))}
    </div>
  )
}
