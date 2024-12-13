import ReactionIcon from '@assets/icons/reaction.svg'
import SystemIcon from '@assets/icons/system.svg'
import TriggerIcon from '@assets/icons/trigger.svg'
import UserIcon from '@assets/icons/user.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

const tags = {
  User: {
    color: '#8585A9',
    icon: UserIcon,
    backgroundColor: '#8585A91F',
  },
  System: {
    color: '#8585A9',
    icon: SystemIcon,
    backgroundColor: '#8585A91F',
  },
  Trigger: {
    color: '#8585A9',
    icon: TriggerIcon,
    backgroundColor: '#8585A91F',
  },
  Reaction: {
    color: '#8585A9',
    icon: ReactionIcon,
    backgroundColor: '#8585A91F',
  },
}

export type Tag = keyof typeof tags

interface TransactionTagsProperties extends ComponentProps<'div'> {
  tags: Tag[]
}

export const TransactionTags = (props: TransactionTagsProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('flex items-center gap-2', className)} {...rest}>
      {props.tags.map((tag) => {
        const Icon = tags[tag].icon
        return (
          <div
            key={tag}
            style={{ color: tags[tag].color, backgroundColor: tags[tag].backgroundColor }}
            className={cn(
              'text-sm/[1rem] relative w-fit py-1 px-[0.38rem] capitalize rounded-md flex items-center gap-1',
              className,
            )}
          >
            <Icon className="size-4 shrink-0" />
            <p>{tag}</p>
          </div>
        )
      })}
    </div>
  )
}
