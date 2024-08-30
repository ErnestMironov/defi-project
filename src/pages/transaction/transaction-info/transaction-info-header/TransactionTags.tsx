import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

const tags = {
  USER: {
    color: 'var(--Green-100, #79DEC2)',
    backgroundColor: 'var(--Green-15, rgba(121, 222, 194, 0.15))',
  },
  SYSTEM: {
    color: 'var(--Main-100, #6160FF)',
    backgroundColor: 'var(--Main-15, rgba(97, 96, 255, 0.15))',
  },
  TRIGGER: {
    color: 'var(--Gray-100, #9998B8)',
    backgroundColor: 'var(--Gray-15, rgba(153, 152, 184, 0.15))',
  },
  REACTION: {
    color: 'var(--Gray-100, #9998B8)',
    backgroundColor: 'var(--Gray-15, rgba(153, 152, 184, 0.15))',
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
            'rounded-[0.5rem] px-5 py-2 max-lg:px-4 text-sm max-lg:text-[0.75rem]/[0.9rem] uppercase flex items-center justify-center h-[2.25rem] max-lg:h-[1.875rem]',
          )}
        >
          <span>{tag}</span>
        </div>
      ))}
    </div>
  )
}
