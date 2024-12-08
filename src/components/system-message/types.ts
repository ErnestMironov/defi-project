export type SystemMessageVariant = 'error' | 'warning' | 'info' | 'success'

export interface SystemMessageProperties {
  variant: SystemMessageVariant
  message: string
  className?: string
}
