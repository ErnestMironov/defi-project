import CrossChainIcon from '@assets/icons/crosschain.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { Drawer, DrawerContent } from '@components/ui/drawer'
import { Switch } from '@components/ui/switch'

interface MobileCrossChainProperties {
  open: boolean
  onOpenChange: (open: boolean) => void
  withdrawToAnotherChain: boolean
  setWithdrawToAnotherChain: (value: boolean) => void
}

export const MobileCrossChain = ({
  open,
  onOpenChange,
  withdrawToAnotherChain,
  setWithdrawToAnotherChain,
}: MobileCrossChainProperties) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh] overflow-hidden border border-stroke-100 bg-none">
        <div className="px-4 pb-12 pt-6">
          <div className="mb-4 flex w-full items-center justify-between">
            <ShadowBox className="flex w-full items-center justify-between gap-[1.7rem] rounded-2xl border border-stroke-100 px-4 py-2">
              <div className="flex items-center gap-2 py-2">
                <CrossChainIcon className="size-4" />
                <span className="text-4 font-medium leading-4 text-text-100">
                  Cross-Chain
                </span>
              </div>
              <Switch
                checked={withdrawToAnotherChain}
                onCheckedChange={setWithdrawToAnotherChain}
              />
            </ShadowBox>
          </div>
          <div />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
