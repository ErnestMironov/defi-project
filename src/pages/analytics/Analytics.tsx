import type { ComponentProps } from 'react'

interface AnalyticsProperties extends ComponentProps<'div'> {}

export const Analytics = (_props: AnalyticsProperties) => {
  return <div>Analytics</div>
}
