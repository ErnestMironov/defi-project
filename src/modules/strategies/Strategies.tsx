import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { StrategiesDesktop } from './StrategiesDesktop'
import { StrategiesMobile } from './StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {}

export const Strategies: React.FC<StrategiesProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return <StrategiesDesktop {...props} filters={{}} />
}
