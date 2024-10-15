import { useInfiniteStrategies } from '@api/queries/useStrategies'
import Arrow from '@assets/icons/arrow-left.svg'
import Eye from '@assets/icons/eye.svg'
import EyeNo from '@assets/icons/eye-no.svg'
import Setting from '@assets/icons/setting.svg'
import { MultiSelect } from '@components/select/MultiSelect'
import { type OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { IconWithLabelComponent } from '@components/token-icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { Loader } from '@components/ui/loader'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { formatPercentValue } from '@utils/formatValue'
import { isHashOrAddress } from '@utils/hash-or-address'
import { type ComponentProps, useState } from 'react'

import {
  type StrategyWithColor,
  useMobileCustomStrategiesChartStore,
} from '../strategies-chart/mobile/useMobileStrategiesChartStore'
import { StrategyRow } from './StrategyRow'

interface CustomProtocolDrawerItemProperties {
  className?: string
  index: number
  strategyWithColor: StrategyWithColor
  onVisibleChange: () => void
}

export const CustomProtocolDrawerItem = ({
  className,
  index,
  strategyWithColor,
  onVisibleChange,
}: CustomProtocolDrawerItemProperties) => {
  const { strategy, color, visible } = strategyWithColor
  return (
    <div className={cn('space-y-3 w-full', className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn('size-2.5 rounded-full', !visible && 'opacity-50')}
          style={{ backgroundColor: color || '#9998B8' }}
        />
        <div className={cn('text-base text-text-90', !visible && 'opacity-50')}>
          Line {index + 1}
        </div>
      </div>
      <div className="flex w-full items-center gap-3">
        <StrategyRow
          withLink={false}
          strategy={strategy}
          className="h-[3.75rem] flex-1 pl-4"
        />
        <div onClick={onVisibleChange} className="size-6 cursor-pointer">
          {visible ? <Eye className="size-full" /> : <EyeNo className="size-full" />}
        </div>
        <StrategyEditDrawer strategyWithColor={strategyWithColor} index={index}>
          <Setting className="size-6" />
        </StrategyEditDrawer>
      </div>
    </div>
  )
}

interface StrategyEditDrawerProperties extends ComponentProps<'div'> {
  strategyWithColor: StrategyWithColor
  index: number
}

const StrategyEditDrawer = (props: StrategyEditDrawerProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const { children, strategyWithColor, index } = props
  const { color } = strategyWithColor
  const { customStrategiesWithColors, onStrategySelect } =
    useMobileCustomStrategiesChartStore()
  const [search, setSearch] = useState<string>('')
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])
  const [selectedToken, setSelectedToken] = useState<OptionType[]>([])
  const { data, hasNextPage, isFetchingNextPage, ref, totalCount, isPlaceholderData } =
    useInfiniteStrategies({
      sort: 'apy',
      order_by: 'desc',
      size: 30,
      strategy_id: isHashOrAddress(search) ? search : undefined,
      chain: selectedChain.map((chain) => chain.value),
      protocol: selectedProtocol.map((protocol) => protocol.value),
      token: selectedToken.map((token) => token.value),
    })
  return (
    <Drawer modal open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent
        withDraggable={false}
        position="right"
        className="w-[34.625rem] items-center justify-center px-6 py-16"
        aria-describedby={undefined}
      >
        <DrawerTitle className="sr-only">Edit line</DrawerTitle>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Arrow className="size-6 cursor-pointer" onClick={() => setIsOpen(false)} />
            <div
              style={{ backgroundColor: color }}
              className="ml-4 size-2.5 shrink-0 rounded-full"
            />
            <span className="ml-2 text-[1.5625rem] text-text-90">Line {index + 1}</span>
          </div>
        </div>
        <div className="mt-10 grid w-full grid-cols-3 gap-x-2 gap-y-4 *:h-[3.375rem]">
          <SearchInput
            value={search}
            className="col-span-3"
            onValueChange={setSearch}
            placeholder="Strategy ID"
          />
          <MultiSelect
            variant="outline"
            options={SELECT_CHAINS}
            value={selectedChain}
            onChange={(value) => setSelectedChain(value)}
            placeholder="All Chains"
            classNames={{ content: 'w-full' }}
          />
          <MultiSelect
            variant="outline"
            options={SELECT_PROTOCOLS}
            value={selectedProtocol}
            onChange={(value) => setSelectedProtocol(value)}
            placeholder="All Protocols"
            classNames={{ content: 'w-full' }}
          />
          <MultiSelect
            variant="outline"
            options={SELECT_TOKENS}
            value={selectedToken}
            onChange={(value) => setSelectedToken(value)}
            placeholder="All Tokens"
          />
        </div>
        <div
          className={cn(
            'mt-8 flex size-full flex-col gap-2 overflow-y-auto',
            isPlaceholderData && 'animate-pulse',
          )}
        >
          {data.map((strategy) => (
            <div
              onClick={() => {
                onStrategySelect(strategy, strategyWithColor)
                setIsOpen(false)
              }}
              key={strategy.id}
              className={cn(
                'cursor-pointer hover:bg-[rgba(97,_96,_255,_0.05)] transition-colors flex h-[3.75rem] items-center gap-[0.62rem] rounded-xl border border-stroke-100 px-4 py-3',
                {
                  hidden: customStrategiesWithColors.some(
                    (_strategyWithColor) =>
                      _strategyWithColor.strategy.id === strategy.id,
                  ),
                },
              )}
            >
              {[strategy.token.symbol, strategy.chain_id, strategy.protocol].map(
                (item) => (
                  <IconWithLabelComponent
                    key={item}
                    symbol={item}
                    className="size-5 text-semi-base"
                  />
                ),
              )}
              <p className="ml-auto text-base uppercase">
                <span className="font-bold">
                  {formatPercentValue(strategy.apy, { minimumFractionDigits: 2 })}
                </span>
                <span className="ml-2 text-gray-100">APY</span>
              </p>
            </div>
          ))}
          {hasNextPage && <div ref={ref} className="h-1 w-full" />}
          {isFetchingNextPage && (
            <div ref={ref} className="mt-6 flex h-8 w-full items-center justify-center">
              <Loader />
            </div>
          )}
          {totalCount === 0 && (
            <div className="flex h-28 items-center justify-center text-base text-text-50">
              <span>Strategies not found</span>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
