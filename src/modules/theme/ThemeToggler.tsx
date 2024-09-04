import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import MoonSvg from './assets/moon.svg'
import SunSvg from './assets/sun.svg'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProperties extends ComponentProps<'div'> {}

export function ThemeToggle(props: ThemeToggleProperties) {
  const { className } = props
  const { setTheme, theme } = useTheme()
  console.log('🚀 ~ ThemeToggle ~ theme:', theme)

  return (
    <SwitchPrimitives.Root
      checked={theme === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      className={cn(
        'inline-flex w-[2.375rem] shrink-0 cursor-pointer items-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input  bg-[linear-gradient(180deg,_#EA1_0%,_#FD6_100%)] data-[state=checked]:bg-[linear-gradient(180deg,_#31E_0%,_#69F_100%)] p-[.15rem]',
        className,
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none size-[.95rem] bg-cards rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.05rem] bg-[linear-gradient(180deg,_#69F_0%,_#31E_100%)] [filter:drop-shadow(0px_2.353px_4.706px_rgba(0,_0,_0,_0.44))] data-[state=unchecked]:bg-[linear-gradient(180deg,_#FD6_0%,_#EA1_100%)] flex justify-center items-center [&>svg]:size-[70%] overflow-hidden',
        )}
      >
        {theme === 'dark' ? (
          <MoonSvg className="animate-moonArc" />
        ) : (
          <SunSvg className="animate-sunArc" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}
