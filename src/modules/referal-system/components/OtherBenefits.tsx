import { cn } from '@utils/cn'

interface OtherBenefitsProperties extends React.HTMLAttributes<HTMLDivElement> {
  otherBenefits: string | null
}

export const OtherBenefits = ({
  otherBenefits,
  className,
  ...props
}: OtherBenefitsProperties) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-md  bg-[#8585A91F] p-1 px-2 max-md:pl-[0.38rem] max-md:text-[0.8125rem]',
        otherBenefits ? 'flex' : 'hidden',
        className,
      )}
      {...props}
    >
      <span className="text-sm text-main-100">Other benefits: {otherBenefits}</span>
    </div>
  )
}
