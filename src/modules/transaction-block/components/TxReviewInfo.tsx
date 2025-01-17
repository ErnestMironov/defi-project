import ChartSpline from '@assets/icons/chart-spline.svg'
import DepositIcon from '@assets/icons/deposit.svg'
import WithdrawIcon from '@assets/icons/withdraw.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import type { ChainType } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { ROUTES } from '@routes/routes'
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
  success?: {
    show: boolean
    type: 'deposit' | 'withdraw'
    hash: string
  }
}

export const TxReviewInfo = ({
  recipient,
  chain,
  withdraw,
  receive,
  success,
}: TxReviewInfoProperties) => {
  const chainData = useTokenAsset(chain)
  const { collapseTxInfo } = useTxStore()
  console.log(withdraw)

  const renderAmountBlock = (data: AmountData) => (
    <div className="flex items-center justify-between px-6 py-3 text-[0.875rem] font-medium leading-6 max-md:px-4">
      <span className="text-text-2100">{data.label}</span>
      <div className="flex items-start gap-1.5">
        {data.token && (
          <TokenWithNetwork
            symbol={data.token.symbol}
            network={data.token.network}
            width="1.5rem"
            position="bottom-right"
            classNames={{ token: 'overflow-hidden rounded-full' }}
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

  const renderSuccessBlock = () => {
    if (!success?.show) return null

    const handleSeeInAnalytics = () => {
      window.open(`${ROUTES.TRANSACTIONS}/${success.hash}`, '_blank')
    }

    return (
      <div className="bg-success-100 flex items-center justify-between  px-6 py-5 text-[0.875rem] font-medium leading-6 max-md:px-4">
        <div className="flex items-center gap-4">
          {success.type === 'deposit' ? (
            <DepositIcon className="size-8" />
          ) : (
            <WithdrawIcon className="size-8" />
          )}
          <div className="flex flex-col">
            <span className="text-base">
              {success.type === 'deposit' ? 'Deposit' : 'Withdraw'}{' '}
              <span className="text-[#8585A999]">Fulfillment</span>
            </span>
            <div className="flex items-center gap-2 text-[0.875rem] leading-4 text-[#8585A999]">
              <span className="text-success-900">{shortenAddress(success.hash)}</span>
              <button type="button" className="text-success-900">
                <CopyButton text={success.hash} />
              </button>
            </div>
          </div>
        </div>
        <Button size="sm" className="gap-[.38rem]" onClick={handleSeeInAnalytics}>
          <ChartSpline className="size-4" />
          See in Analytics
        </Button>
      </div>
    )
  }

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
      <div className="flex w-full flex-col divide-y divide-stroke-100 border-y border-stroke-100 dark:divide-[#3E3E4D66] dark:border-[#3E3E4D66]">
        {renderSuccessBlock()}
        <div className="grid grid-cols-2 divide-x divide-stroke-100 dark:divide-[#3E3E4D66]">
          <div className="flex items-center justify-between px-6 py-3 max-md:px-4">
            <span className="text-text-2100">{recipient.label}</span>
            <div className="flex items-center gap-2">
              <span>{shortenAddress(recipient.value)}</span>
              <button type="button" className="text-primary-500">
                <CopyButton text={recipient.value} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-3 max-md:px-4">
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
