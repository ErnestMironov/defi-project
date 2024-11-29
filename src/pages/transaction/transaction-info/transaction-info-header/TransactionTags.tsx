import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

const tags = {
  User: {
    color: 'var(--Green-100, #79DEC2)',
    backgroundColor: 'var(--Green-15, rgba(121, 222, 194, 0.15))',
  },
  System: {
    color: '#8585A9',
    backgroundColor: '#8585A91F',
  },
  Trigger: {
    color: '#8585A9',
    backgroundColor: '#8585A91F',
  },
  Reaction: {
    color: '#8585A9',
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
      {props.tags.map((tag) => (
        <div
          key={tag}
          style={{ color: tags[tag].color, backgroundColor: tags[tag].backgroundColor }}
          className={cn(
            'text-sm/[1rem] relative w-fit py-1 px-2 capitalize rounded-md',
            className,
          )}
        >
          <p>{tag}</p>
        </div>
      ))}
    </div>
  )
}
