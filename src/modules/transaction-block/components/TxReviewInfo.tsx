import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { formatAmount } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import { motion } from 'framer-motion'

import { useTxStore } from '../store/useTxStore'

interface AmountData {
  label: string
  value: string
  usdValue: string
  token?: {
    symbol: string
    network: ChainType
  }
}

interface TxReviewInfoProperties {
  recipient: {
    label: string
    value: string
  }
  chain: number
  withdraw: AmountData
  receive: AmountData
}

export const TxReviewInfo = ({
  recipient,
  chain,
  withdraw,
  receive,
}: TxReviewInfoProperties) => {
  const chainData = useTokenAsset(chain)
  const { collapseTxInfo } = useTxStore()

  const renderAmountBlock = (data: AmountData) => (
    <div className="flex items-center justify-between px-6 py-3 text-[0.875rem] font-medium leading-6">
      <span className="text-text-2100">{data.label}</span>
      <div className="flex items-start gap-1.5">
        {data.token && (
          <TokenWithNetwork
            symbol={data.token.symbol}
            network={data.token.network}
            width="1.5rem"
            position="bottom-right"
          />
        )}
        <span>
          {formatAmount(data.value, {
            maximumFractionDigits: 5,
          })}
          {data.token && ` ${data.token.symbol}`}
        </span>
        <span className="text-text-60">
          ($
          {formatAmount(data.usdValue, {
            maximumFractionDigits: 2,
          })}
          )
        </span>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={
        collapseTxInfo ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }
      }
      transition={{ duration: 0.33 }}
      style={{ overflow: 'hidden' }}
      className="text-[0.875rem] font-medium leading-6"
    >
      <div className="flex w-full flex-col divide-y divide-stroke-100 border-y border-stroke-100">
        <div className="grid grid-cols-2 divide-x divide-stroke-100">
          <div className="flex items-center justify-between px-6 py-3">
            <span className="text-text-2100">{recipient.label}</span>
            <div className="flex items-center gap-2">
              <span>{shortenAddress(recipient.value)}</span>
              <button type="button" className="text-primary-500">
                <CopyButton text={recipient.value} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <span className="text-text-2100">Chain</span>
            <div className="flex items-center gap-2">
              <TokenIconComponent
                symbol={chainData?.symbol ?? 'Unknown Symbol'}
                width="1.5rem"
                className="overflow-hidden rounded-lg"
              />
              <span>{chainData?.name ?? 'Unknown Chain'}</span>
            </div>
          </div>
        </div>

        {renderAmountBlock(withdraw)}
        {renderAmountBlock(receive)}
      </div>
    </motion.div>
  )
}
