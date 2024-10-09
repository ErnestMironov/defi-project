import InfoIcon from '@assets/icons/info-2.svg'
import WarningIcon from '@assets/icons/warn.svg'
import sorry from '@assets/images/sorry.png'
import horus from '@assets/lottie/horus.json'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import Lottie from 'lottie-react'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'

interface UniversalSelectModalProperties<T, U> {
  title: string
  selectedItem: U | null
  onChange: (item: U) => void
  items: T[]
  isLoading: boolean
  renderTrigger: (selectedItem: U | null) => React.ReactNode
  renderItem: (item: T, onChange: (item: U) => void) => React.ReactNode
}

export function UniversalSelectModal<T, U>({
  title,
  selectedItem,
  items,
  isLoading,
  renderTrigger,
  renderItem,
  onChange,
}: UniversalSelectModalProperties<T, U> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  const [opened, setOpened] = useState(false)

  const handleChange = (item: U) => {
    console.log('🚀 ~ handleChange ~ item:', item)
    onChange(item as U)
    setOpened(false)
  }

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>{renderTrigger(selectedItem)}</DialogTrigger>
      <DialogContent className="gap-6 text-text max-lg:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-2 overflow-scroll">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Lottie className="w-60" animationData={horus} loop />
              <div className="flex items-center justify-center gap-2 self-stretch rounded-2xl bg-[rgba(97,_96,_255,_0.05)] px-6 py-4 text-[1.25rem] leading-[150%]">
                <InfoIcon className="size-8" />
                We are looking for your positions onchain...
              </div>
            </div>
          ) : (
            items.map((item) => renderItem(item, handleChange))
          )}
          {items.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={sorry} alt="sorry" className="w-60" />
              <div className="flex items-center justify-center gap-2 self-stretch rounded-2xl bg-orange-15 px-6 py-4 text-[1.25rem] leading-[150%]">
                <WarningIcon className="size-8" />
                Looks like you haven&apos;t staked anything yet!
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
