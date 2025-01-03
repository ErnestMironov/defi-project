import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import CrossChainIcon from '@assets/icons/crosschain.svg'
import SettingsIcon from '@assets/icons/settings.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { Switch } from '@components/ui/switch'
import { TX_TYPE } from '@constants/txTypes'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import { type ComponentProps, useCallback, useState } from 'react'

import { TVLDisplay } from './components/TVLDisplay'
import { DepositInput } from './deposit/DepositInput'
import { useSetDepositDetails } from './deposit/hooks/useSetDepositDetails'
import { useTxStore } from './store/useTxStore'
import { TxTypeSwitcher } from './TxTypeSwither'
import { MobileCrossChain } from './withdraw/MobileCrossChain'
import { WithdrawInput } from './withdraw/WithdrawInput'

interface DepositBlockProperties extends ComponentProps<'div'> {}

export const TransactionBlock = (props: DepositBlockProperties) => {
  const { className, ...rest } = props
  const {
    txType,
    withdrawToAnotherChain,
    setWithdrawToAnotherChain,
    inputError,
    mtToken,
  } = useTxStore()
  const { isBelowDesktop } = useDeviceWidth()
  useGetSwapRoute()
  useSetDepositDetails()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleOpenCrossChainDialog = useCallback(() => {
    setIsDialogOpen(true)
  }, [])

  return (
    <div
      className={clsx(
        'gradient-border relative flex w-full flex-col rounded-3xl pt-4 max-lg:pt-2',
        inputError && 'error',
        className,
      )}
      {...rest}
    >
      <div className="mb-4 flex items-center justify-between px-4 max-lg:mb-2">
        <TxTypeSwitcher />
        {txType === TX_TYPE.DEPOSIT ? (
          <TVLDisplay />
        ) : isBelowDesktop ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'rounded-2xl border-stroke-100 p-3 shadow-test',
                mtToken === null ? 'hidden' : 'block',
              )}
              onClick={handleOpenCrossChainDialog}
            >
              <SettingsIcon className="size-4" />
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="">
                <MobileCrossChain
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  withdrawToAnotherChain={withdrawToAnotherChain}
                  setWithdrawToAnotherChain={setWithdrawToAnotherChain}
                />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <ShadowBox className="flex items-center justify-between gap-[1.7rem] rounded-xl border border-stroke-100  px-4 py-3">
            <div className="flex items-center gap-2">
              <CrossChainIcon className="size-4" />
              <span className="text-[0.875rem] font-medium leading-4 text-text-100">
                Cross-Chain
              </span>
            </div>
            <Switch
              checked={withdrawToAnotherChain}
              onCheckedChange={setWithdrawToAnotherChain}
            />
          </ShadowBox>
        )}
      </div>
      {txType === TX_TYPE.DEPOSIT && <DepositInput />}
      {txType === TX_TYPE.WITHDRAW && <WithdrawInput />}
    </div>
  )
}
