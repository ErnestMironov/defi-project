import ArrowDown from '@assets/icons/arrow-up.svg'
import Check from '@assets/icons/check.svg'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { CHAINS } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import Grey3DBox from '@modules/transaction-block/components/Grey3DBox'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { filterChainsByVault } from '@modules/transaction-block/utils/filterChainsByVault'
import type * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'

const NetworkItem: React.FC<{ chain: any; onClick: () => void }> = ({
  chain,
  onClick,
}) => {
  const networkData = useTokenAsset(chain)
  const { vault, depositToNetwork } = useTxStore()

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex cursor-pointer items-center justify-between',
        "before:content-['] before:absolute before:inset-1/2 before:size-[calc(100%+1rem)] before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 hover:before:scale-100 before:transition-transform before:rounded-[0.625rem] before:bg-main-15 before:opacity-0 hover:before:opacity-50",
      )}
    >
      <div className="flex items-center gap-3 text-[1.1875rem] leading-[120%]">
        <TokenWithNetwork className="size-8" symbol={vault} network={chain} />
        {networkData?.name}
      </div>
      {depositToNetwork === chain && <Check className="size-6" />}
    </div>
  )
}

interface NetworkPopoverProperties extends PopoverPrimitive.PopoverProps {
  disabled: boolean
}

export const NetworkSelector: React.FC<NetworkPopoverProperties> = ({ disabled }) => {
  const [isOpened, setIsOpened] = useState(false)
  const { vault, depositToNetwork, setDepositToNetwork } = useTxStore()
  const NetworkData = useTokenAsset(depositToNetwork)

  const filteredChains = useMemo(() => filterChainsByVault([...CHAINS], vault), [vault])

  return (
    <Popover
      open={isOpened}
      onOpenChange={() => {
        setIsOpened(!isOpened)
      }}
    >
      <PopoverTrigger className="w-full" disabled={disabled}>
        <Grey3DBox>
          <div className="flex items-center gap-[.66rem] text-[1.1875rem] font-bold leading-[120%] text-text-80">
            <TokenWithNetwork
              className="size-8"
              symbol={vault}
              network={depositToNetwork}
            />
            {NetworkData?.name}
          </div>
          <ArrowDown
            className="size-4 transition"
            style={{
              transform: isOpened ? 'scaleY(-1)' : 'scaleY(1)',
            }}
          />
        </Grey3DBox>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        onInteractOutside={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        sideOffset={8}
        className="pointer-events-auto flex w-[23.25rem] flex-col gap-5 rounded-3xl bg-[#F9F9FF] p-6 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] dark:bg-cards-widget"
      >
        {filteredChains.map((chain) => (
          <NetworkItem
            key={chain}
            chain={chain}
            onClick={() => {
              setDepositToNetwork(chain)
              setIsOpened(false)
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  )
}
