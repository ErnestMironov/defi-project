import { cn } from '@utils/cn'

interface IncentivesProperties extends React.HTMLAttributes<HTMLDivElement> {
  incentives: string | null
}

export const Incentives = ({ incentives, className, ...props }: IncentivesProperties) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-md  bg-[#8585A91F] p-1 px-2 max-md:pl-[0.38rem] max-md:text-[0.8125rem]',
        incentives ? 'flex' : 'hidden',
        className,
      )}
      {...props}
    >
      <span className="text-sm text-main-100">Incentives: {incentives}</span>
    </div>
  )
}
