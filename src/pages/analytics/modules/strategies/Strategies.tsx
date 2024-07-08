import useDeviceWidth from '@hooks/useDeviceWidth'

import { StrategiesDesktop } from './StrategiesDesktop'
import { StrategiesMobile } from './StrategiesMobile'

export const Strategies: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return <StrategiesDesktop {...props} />
}
