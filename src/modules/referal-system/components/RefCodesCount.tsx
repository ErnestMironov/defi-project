import { cn } from '@utils/cn'

interface ReferalCodesCountProperties extends React.HTMLAttributes<HTMLDivElement> {
  refCodesCount: number | null
}

export const ReferalCodesCount = ({
  refCodesCount,
  className,
  ...props
}: ReferalCodesCountProperties) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-md  bg-[#8585A91F] p-1 px-2 max-md:pl-[0.38rem] max-md:text-[0.8125rem]',
        className,
      )}
      {...props}
    >
      <span className="text-sm text-main-100">+ {refCodesCount} ref codes</span>
    </div>
  )
}
