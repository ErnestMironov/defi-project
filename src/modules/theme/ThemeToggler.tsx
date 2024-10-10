import { Button } from '@components/ui/button'
import { useAppKitTheme } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentProps } from 'react'

import MoonV1Svg from './assets/moon-v1.svg'
import SunV1Svg from './assets/sun-v1.svg'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProperties extends ComponentProps<'div'> {}

export function ThemeToggler(props: ThemeToggleProperties) {
  const { className } = props
  const { setTheme, theme } = useTheme()
  const { setThemeMode } = useAppKitTheme()
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setThemeMode(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      size="icon"
      variant="container"
      onClick={handleThemeToggle}
      className={cn(
        'flex size-12 justify-center items-center overflow-hidden',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            y: { type: 'spring', stiffness: 500, damping: 25 },
          }}
        >
          {theme === 'dark' ? (
            <MoonV1Svg className="size-7 overflow-visible" />
          ) : (
            <SunV1Svg className="size-7 overflow-visible" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
