import type { SystemMessageVariant } from './types'

export const VARIANT_STYLES: Record<
  SystemMessageVariant,
  {
    background: string
    color: string
  }
> = {
  error: {
    background: 'bg-red-5',
    color: 'text-red-100',
  },
  warning: {
    background: 'bg-alerts-alert',
    color: 'text-4100',
  },
  info: {
    background: 'bg-input-default',
    color: 'text-text-2100',
  },
  success: {
    background: 'bg-green-115',
    color: 'text-green-1100',
  },
}
