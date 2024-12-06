import RevardsIcon from '@assets/icons/revards.svg'
import { cn } from '@utils/cn'

interface EarningMethodCardProperties extends React.HTMLAttributes<HTMLDivElement> {
  earningMethod: {
    title: string
    description: string
  }
}

export default function EarningMethodCard({
  earningMethod,
  className,
  ...props
}: EarningMethodCardProperties) {
  return (
    <div
      className={cn(
        'bg-cards-widget rounded-3xl shadow-widget-gradient font-aeonik p-4 h-[6.875rem] h-auto ',
        className,
      )}
      {...props}
    >
      <div className="align-start flex  w-[13.75rem] gap-4">
        <RevardsIcon className="mt-0.5 size-6 rounded-full bg-violet-15" />
        <div className="">
          <h3 className=" text-lg font-medium leading-6 text-text-100">
            {earningMethod.title}
          </h3>
          <p className="text-sm font-medium leading-5 text-text-2100">
            {earningMethod.description}
          </p>
        </div>
      </div>
    </div>
  )
}
