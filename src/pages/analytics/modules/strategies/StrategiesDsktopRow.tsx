import Copy from '@assets/icons/copy.svg'
import ActiveCopy from '@assets/icons/copy_active.svg'
import type { StrategyStats } from '@codegen/graphql'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Dialog as BaseDialog, DialogContent } from '@components/ui/dialog'
import { PROTOCOL_DESCRIPTION } from '@constants/protocol-description'
import { useClipboard } from '@hooks/useClipboard'
import { formatAmountValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import BigNumber from 'bignumber.js'
import { motion } from 'framer-motion'
import type { FC } from 'react'
import { useState } from 'react'

interface DialogProperties {
  open: boolean
  strategy?: StrategyStats
  onClose: () => void
}

const Dialog: FC<DialogProperties> = ({ open, strategy, onClose }) => {
  const { copyWithToast, isCopied } = useClipboard()
  const description = Object.entries(PROTOCOL_DESCRIPTION).find(
    ([key]) => strategy?.protocol.match(new RegExp(key, 'i')),
  )?.[1]

  if (!open) return null

  return (
    <BaseDialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="flex w-auto max-w-full flex-col gap-12 rounded-[2.5rem] px-8 py-10 text-text focus-visible:outline-none"
      >
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-center justify-between self-stretch border-b border-b-stroke-100 pb-8">
            <div className="text-[2rem] font-bold leading-[100%]">
              Strategy Description
            </div>
            <div className="flex items-start gap-7 text-[1.25rem]">
              <IconWithLabelComponent
                symbol={strategy?.tokenSymbol}
                className="size-10"
              />
              <IconWithLabelComponent symbol={strategy?.chainName} className="size-10" />
              <IconWithLabelComponent symbol={strategy?.protocol} className="size-10" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-12">
          <div className="description w-36 text-[1.625rem] leading-[100%] text-text-90">
            Description
          </div>
          <div className="max-w-[45.8125rem;] text-[1.375rem] leading-[140%] text-text-90">
            {description}
          </div>
        </div>
        <div className="h-px bg-stroke-100" />
        <div className="flex items-start gap-12">
          <div className="w-36 text-[1.625rem] leading-[100%] text-text-90">APY</div>
          <div className="flex items-start gap-28">
            <div className="flex flex-col items-start gap-2">
              <div className="text-lg uppercase leading-[120%] text-gray-100">
                Last 7 days
              </div>
              <div className="text-[2.1875rem] font-bold leading-[120%] text-text-90">
                {strategy?.apy ? Number(strategy?.apy).toFixed(2) : '-'}%
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-lg uppercase leading-[120%] text-gray-100">
                Last 30 days
              </div>
              <div className="text-[2.1875rem] font-bold leading-[120%] text-text-90">
                -
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-lg uppercase leading-[120%] text-gray-100">
                Inception
              </div>
              <div className="text-[2.1875rem] font-bold leading-[120%] text-text-90">
                -
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-stroke-100" />
        <div className="flex items-start gap-12">
          <div className="w-36 text-[1.625rem] leading-[100%] text-text-90">Address</div>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center gap-3">
              <div className="text-[1.375rem] leading-[140%] text-text-90">
                {strategy?.strategyId}
              </div>
              <div className="cursor-pointer">
                {isCopied ? (
                  <ActiveCopy type="button" className="ml-2 size-5 overflow-visible" />
                ) : (
                  <Copy
                    type="button"
                    className="ml-2 size-5 overflow-visible"
                    onClick={() => {
                      copyWithToast(strategy?.strategyId ?? '')
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </BaseDialog>
  )
}

interface StrategyRowProperties {
  strategy: StrategyStats
}

export const StrategyRow: React.FC<StrategyRowProperties> = ({ strategy }) => {
  const { copyWithToast } = useClipboard()

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Table.Row className="cursor-pointer" onClick={openModal}>
        <Table.Cell>
          <IconWithLabelComponent symbol={strategy?.tokenSymbol} className="size-10" />
        </Table.Cell>
        <Table.Cell>
          <IconWithLabelComponent symbol={strategy?.chainName} className="size-10" />
        </Table.Cell>
        <Table.Cell>
          <IconWithLabelComponent symbol={strategy.protocol} className="size-10" />
        </Table.Cell>
        {/* // ! remove "* 5" when we have real data */}
        <Table.Cell>{BigNumber(strategy.apy).multipliedBy(5).toFixed(2)}%</Table.Cell>
        <Table.Cell>
          $
          {formatAmountValue(
            BigNumber(strategy.deposited)
              .div(10 ** strategy.decimals)
              ?.toString(),
            2,
          )}
        </Table.Cell>
        <Table.Cell className="px-10 py-6">
          <motion.div
            onClick={() => copyWithToast(strategy.strategyId)}
            className="flex h-7 w-fit cursor-pointer justify-start transition"
            whileHover={{ scale: '1.05' }}
            whileTap={{ scale: '0.95' }}
          >
            <span className="">{shortenString(strategy.strategyId)}</span>
          </motion.div>
        </Table.Cell>
      </Table.Row>
      <Dialog open={isOpen} onClose={closeModal} strategy={strategy} />
    </>
  )
}
