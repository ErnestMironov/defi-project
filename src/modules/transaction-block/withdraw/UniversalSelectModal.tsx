import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Skeleton } from '@components/ui/skeleton'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'

interface UniversalSelectModalProperties<T> {
  title: string
  selectedItem: T | null
  onChange: (item: T) => void
  items: T[]
  isLoading: boolean
  renderTrigger: (selectedItem: T | null) => React.ReactNode
  renderItem: (item: T, onChange: (item: T) => void) => React.ReactNode
}

export function UniversalSelectModal<T>({
  title,
  selectedItem,
  items,
  isLoading,
  renderTrigger,
  renderItem,
  onChange,
}: UniversalSelectModalProperties<T> & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  const [opened, setOpened] = useState(false)

  const handleChange = (item: T) => {
    onChange(item)
    setOpened(false)
  }

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>{renderTrigger(selectedItem)}</DialogTrigger>
      <DialogContent className="gap-6 text-text">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
              />
            ))}
          {items.map((item) => renderItem(item, handleChange))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
