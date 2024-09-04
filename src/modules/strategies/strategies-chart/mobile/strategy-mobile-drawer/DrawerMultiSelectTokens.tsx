import type { OptionType } from '@components/select/Select'
import { TokenIconComponent } from '@components/token-icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { SELECT_TOKENS } from '@constants/select-constant'
import { Check } from 'lucide-react'
import type { ComponentProps } from 'react'

interface DrawerMultiSelectTokensProperties extends ComponentProps<'div'> {
  selectedTokens: OptionType[]
  setSelectedTokens: (tokens: OptionType[]) => void
  tokens: OptionType[]
}

export const DrawerMultiSelectTokens = (props: DrawerMultiSelectTokensProperties) => {
  const { selectedTokens, setSelectedTokens, tokens } = props
  return (
    <Drawer>
      <DrawerTrigger asChild className="h-11">
        <div className="flex h-full w-[2.625rem] flex-col items-center justify-center rounded-xl border border-stroke-100 p-2">
          <div className="relative size-6 rounded-full">
            {selectedTokens.length === 0 || selectedTokens.length >= 2 ? (
              <>
                <TokenIconComponent
                  symbol={SELECT_TOKENS[0].value}
                  className="absolute inset-0 size-[1.08619rem]"
                />
                <TokenIconComponent
                  symbol={SELECT_TOKENS[1].value}
                  className="absolute bottom-0 right-0 size-[1.08619rem]"
                />
              </>
            ) : (
              <TokenIconComponent symbol={selectedTokens[0].value} className="" />
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className="px-4">
        <DrawerTitle className="sr-only">Select token</DrawerTitle>
        <div className="flex flex-col gap-3 py-6">
          {tokens.map((token) => (
            <div
              key={token.value}
              className="flex items-center justify-between"
              onClick={() => {
                if (selectedTokens.includes(token)) {
                  setSelectedTokens(selectedTokens.filter((t) => t.value !== token.value))
                } else {
                  setSelectedTokens([...selectedTokens, token])
                }
              }}
            >
              {token.label}
              {selectedTokens.includes(token) && <Check className="size-[1.125rem]" />}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
