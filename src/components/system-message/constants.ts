import type { SystemMessageVariant } from './types'

export const VARIANT_STYLES: Record<
  SystemMessageVariant,
  {
    background: string
    color: string
    icon: string
  }
> = {
  error: {
    background: 'bg-red-5',
    color: 'text-red-100',
    icon: 'text-red-500',
  },
  warning: {
    background: 'bg-yellow-50',
    color: 'text-yellow-500',
    icon: 'text-yellow-500',
  },
  info: {
    background: 'bg-blue-50',
    color: 'text-blue-500',
    icon: 'text-blue-500',
  },
  success: {
    background: 'bg-green-50',
    color: 'text-green-500',
    icon: 'text-green-500',
  },
}
