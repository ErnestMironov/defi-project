import Link from '@assets/icons/link.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { cn } from '@utils/cn'

import UserPoints from './UserPoints'

interface ReferalLinksProperties extends React.HTMLAttributes<HTMLDivElement> {
  codes: string[]
}

export default function ReferalLinks({
  codes,
  className,
  ...props
}: ReferalLinksProperties) {
  return (
    <div className={cn(className, 'w-full')} {...props}>
      <div className="flex w-full flex-col rounded-3xl border border-stroke-100 bg-cards-widget">
        <div className="flex w-full justify-between border-b border-stroke-100 px-6 py-3">
          <div className="flex items-center gap-1.5 ">
            <Link className="size-4" />
            <p className="text-sm text-text-100">Links</p>
          </div>
          <UserPoints value={100} className="flex bg-cards-widget" />
        </div>
        <div
          className={cn(
            'flex w-full flex-row gap-3 px-6 py-4',
            codes.length > 3 && 'flex-col',
          )}
        >
          {codes.map((code) => (
            <div
              key={code}
              className={cn(
                'bg-[rgba(230, 232, 240, 0.20)] flex items-center justify-center rounded-xl px-3 py-5 border border-transparent hover:border-stroke-100',
                codes.length > 3 ? 'w-full' : 'w-[calc(50%-0.375rem)]',
              )}
            >
              <div className="flex items-center gap-[0.38rem]">
                <p className="text-2xl text-text-100">{code}</p>
                <CopyButton text={code} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
