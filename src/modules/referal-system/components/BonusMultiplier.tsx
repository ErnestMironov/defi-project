import Asterisk from '@assets/icons/asterisk.svg'

interface BonusMultiplierProperties extends React.HTMLAttributes<HTMLDivElement> {
  multiplier: number
}

export default function BonusMultiplier({
  multiplier,
  ...props
}: BonusMultiplierProperties) {
  return (
    <div
      className="flex items-center gap-1 rounded-md  bg-[#8585A90D] p-1 px-2"
      {...props}
    >
      <Asterisk />
      <p className="text-sm font-medium text-text-2100">Multiplier</p>
      <p className="text-sm font-medium">X{multiplier}</p>
    </div>
  )
}
