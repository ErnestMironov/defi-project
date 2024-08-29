import Copy from '@assets/icons/copy.svg'
import { useClipboard } from '@hooks/common/useClipboard'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'

interface CopyButtonProperties extends ComponentProps<'div'> {
  text: string
}

export const CopyButton = (props: CopyButtonProperties) => {
  const { copyWithToast } = useClipboard()
  const { className, text } = props

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation()
        copyWithToast(text)
      }}
      className={cn('flex size-6 cursor-pointer justify-start', className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <Copy type="button" className="size-full overflow-visible" />
    </motion.div>
  )
}
