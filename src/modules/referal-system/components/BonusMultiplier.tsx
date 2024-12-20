import type { UserRewards } from '@api/maat-finance/types'
import Asterisk from '@assets/icons/asterisk.svg'

interface BonusMultiplierProperties extends React.HTMLAttributes<HTMLDivElement> {
  multiplier: UserRewards['currentRewardMultiplier']
}

export default function BonusMultiplier({
  multiplier,
  ...props
}: BonusMultiplierProperties) {
  return (
    <div
      className="flex items-center gap-1 rounded-md  bg-[#8585A91F] p-1 px-2 max-md:pl-[0.38rem] max-md:text-[0.8125rem]"
      {...props}
    >
      <Asterisk />
      <p className="text-sm font-medium text-text-2100">Multiplier</p>
      <p className="text-sm font-medium">x{multiplier.toFixed(1)}</p>
    </div>
  )
}
