import { useAppKitTheme } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'

import MoonV1Svg from './assets/moon-v1.svg'
import SunV1Svg from './assets/sun-v1.svg'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProperties extends ComponentProps<'div'> {}

export function ThemeToggler(props: ThemeToggleProperties) {
  const { className } = props
  const { setTheme, theme } = useTheme()
  const { setThemeMode } = useAppKitTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setThemeMode(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center w-auto h-auto rounded-[0.75rem] border border-stroke-100 p-1 gap-1 bg-misc-card',
        'transition-colors cursor-pointer shadow-test',
        className,
      )}
      type="button"
    >
      <motion.div
        className={cn(
          'absolute top-1 left-1 z-0 rounded-[0.75rem]',
          'bg-main-100',
          'transition-all duration-300 ease-out pointer-events-none ',
        )}
        initial={false}
        animate={{
          x: theme === 'light' ? '0%' : '140%',
          width: '35%',
          height: '82%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
      />

      <div className="relative z-10 flex w-full items-center ">
        <div className="flex w-1/2 items-center justify-center ">
          <div
            className={cn(
              'flex justify-center items-center w-auto h-auto rounded-[0.75rem] ',
              theme === 'light' ? 'bg-main-100' : 'bg-transparent hover:bg-[#8585A914]',
              'p-3',
            )}
          >
            <SunV1Svg
              className={cn(
                theme === 'light'
                  ? 'fill-white'
                  : 'fill-gray-400 [&_path]:stroke-gray-400',
                'size-4',
              )}
            />
          </div>
        </div>

        <div className="flex w-1/2 items-center justify-center ">
          <div
            className={cn(
              'flex justify-center items-center w-auto h-auto rounded-[0.75rem]',
              theme === 'dark' ? '!bg-main-100' : 'bg-transparent hover:bg-[#8585A914]',
              'p-3',
            )}
          >
            <MoonV1Svg
              className={cn(
                theme === 'dark' ? 'fill-white [&_path]:stroke-white' : '',
                'size-4',
              )}
            />
          </div>
        </div>
      </div>
    </button>
  )
}
