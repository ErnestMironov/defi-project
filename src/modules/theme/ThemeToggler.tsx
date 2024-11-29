import { Button } from '@components/ui/button'
import { useAppKitTheme } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import MoonV1Svg from './assets/moon-v1.svg'
import SunV1Svg from './assets/sun-v1.svg'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProperties extends ComponentProps<'div'> {}

export function ThemeToggler(props: ThemeToggleProperties) {
  const { className } = props
  const { setTheme, theme } = useTheme()
  const { setThemeMode } = useAppKitTheme()

  const handleSetLightTheme = () => {
    setTheme('light')
    setThemeMode('light')
  }

  const handleSetDarkTheme = () => {
    setTheme('dark')
    setThemeMode('dark')
  }

  return (
    <div
      className={cn(
        'relative flex items-center w-auto h-auto rounded-[12px] p-2 gap-2',
        'transition-colors',
        theme === 'light' ? 'border-stroke-element border' : 'border-transparent',
        className,
      )}
    >
      {/* Анимированный фон */}
      {/* <motion.div
        className={cn(
          'absolute left-0 top-0 z-0 h-[40px] w-[40px] rounded-[12px] mx-2 my-2 bg-main-100',
        )}
        initial={false}
        animate={{
          x: theme === 'light' ? '0%' : '112%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      /> */}

      {/* Кнопка для светлой темы */}
      <div className="relative z-10 flex w-1/2 items-center justify-center ">
        <Button
          size="icon"
          variant="container"
          onClick={handleSetLightTheme}
          className={cn(
            'flex justify-center items-center w-auto h-auto rounded-[12px]',
            theme === 'light' ? 'bg-main-100' : 'bg-auto',
          )}
        >
          <SunV1Svg className="size-5" />
        </Button>
      </div>

      {/* Кнопка для темной темы */}
      <div className="relative z-10 flex w-1/2 items-center justify-center">
        <Button
          size="icon"
          variant="container"
          onClick={handleSetDarkTheme}
          className={cn(
            'flex justify-center items-center w-auto h-auto border-xl',
            theme === 'light' ? 'text-white ' : 'text-gray-500 bg-main-100',
          )}
        >
          <MoonV1Svg className="size-5" />
        </Button>
      </div>
    </div>
  )
}
