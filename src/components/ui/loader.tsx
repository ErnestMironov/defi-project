import { cn } from '@utils/cn'

import { Logo } from './logo'

interface LogoProperties extends React.SVGProps<SVGSVGElement> {
  fill?: string
}

export const Loader = ({ className, ...rest }: LogoProperties) => {
  return <Logo {...rest} className={cn('animate-spin-y size-12', className)} />
}
