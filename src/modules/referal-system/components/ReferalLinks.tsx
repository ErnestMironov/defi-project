import Copy from '@assets/icons/copy-icon.svg'
import Link from '@assets/icons/link.svg'
import { useTheme } from '@modules/theme/ThemeProvider'
import { cn } from '@utils/cn'
import { toast } from 'react-hot-toast'

import { SpecialQuests } from './SpecialQuests'
import UserPoints from './UserPoints'

interface ReferalLinksProperties extends React.HTMLAttributes<HTMLDivElement> {
  codes: string[]
  points: number
}

export default function ReferalLinks({
  codes,
  className,
  points,
  ...props
}: ReferalLinksProperties) {
  const { theme } = useTheme()

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Copied!', {
        style: {
          background: theme === 'dark' ? '#232329' : 'white',
          color: theme === 'dark' ? 'white' : 'black',
        },
      })
    })
  }

  return (
    <div className={cn(className, 'flex flex-col gap-4 rounded-3xl w-full')} {...props}>
      <div className="flex w-full flex-col rounded-3xl border border-stroke-100 bg-cards-widget shadow-test-2">
        <div className="flex w-full justify-between border-b border-stroke-100 px-6 py-3">
          <div className="flex items-center gap-1.5 ">
            <Link className="size-4" />
            <p className="text-text text-sm">Links</p>
          </div>
          <UserPoints value={points} className="flex bg-cards-widget" />
        </div>
        <div
          className={cn(
            'flex w-full flex-row gap-3 px-6 py-4 max-md:flex-col',
            codes.length > 3 && 'flex-col',
          )}
        >
          <div className="flex w-full flex-wrap gap-3">
            {codes.map((code) => (
              <div
                key={code}
                className={cn(
                  'bg-[rgba(230, 232, 240, 0.20)] cursor-pointer flex items-center w-full justify-center rounded-xl px-3 py-5 border border-stroke-100 hover:border-transparent hover:bg-[#E6E8F033] max-md:w-full',
                  codes.length > 2 ? 'w-[calc(50%-0.375rem)]' : 'w-full',
                )}
                onClick={() => handleCopy(code)}
              >
                <div className="flex items-center gap-[0.38rem]">
                  <p className="text-text text-[1.125rem] leading-6">{code}</p>
                  <Copy />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SpecialQuests />
    </div>
  )
}
