// import CheckCopy from '@assets/icons/check-copy.svg'
import Copy from '@assets/icons/copy-icon.svg'
import { useClipboard } from '@hooks/common/useClipboard'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { type ComponentProps, useState } from 'react'

interface CopyButtonProperties extends ComponentProps<'div'> {
  text: string
}

export const CopyButton = (props: CopyButtonProperties) => {
  const { copyWithToast } = useClipboard()
  const { className, text, children } = props
  const [_, setIsCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    copyWithToast(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <motion.div
      onClick={handleCopy}
      className={cn('flex size-4 cursor-pointer justify-start', className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {children ?? <Copy type="button" className="size-full overflow-visible" />}
    </motion.div>
  )
}
