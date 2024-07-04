import { cn } from '@utils/cn'
import type { HTMLMotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'

export const DotLoader = (props: HTMLMotionProps<'span'>) => {
  const { className, ...rest } = props
  return (
    <AnimatePresence>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          {...rest}
          className={cn('', className)}
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            duration: 1,
            delay: i * 0.3,
          }}
        >
          .
        </motion.span>
      ))}
    </AnimatePresence>
  )
}
