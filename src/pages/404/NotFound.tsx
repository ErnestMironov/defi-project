import type { ComponentProps } from 'react'

interface NotFoundProperties extends ComponentProps<'div'> {}

export const NotFound = (props: NotFoundProperties) => {
  return <div>not found</div>
}
