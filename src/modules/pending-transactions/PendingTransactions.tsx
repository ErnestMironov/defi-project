// src/modules/pending-transactions/CollapsedTransaction.tsx
import arrowNext from '@assets/icons/arrow-next.png'
import ErrorCircle from '@assets/icons/error-circle.svg'
import Expand from '@assets/icons/expand.svg'
import rainbow from '@assets/images/rainbow-circle.png'
import loader from '@assets/lottie/wizard-main-loader.json'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import useDeviceWidth from '@hooks/useDeviceWidth'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import React, { useState } from 'react'

import { useTransactionStatusChecker } from './useTransactionStatusTracker'

interface CollapsedTransactionProperties {
  transaction: IPendingTransactionData
  onClick: (transaction: IPendingTransactionData) => void
}

const CollapsedTransaction: React.FC<CollapsedTransactionProperties> = ({
  transaction,
  onClick,
}) => {
  const statusText = {
    pending: 'in progress',
    success: 'is done!',
    error: 'failed',
  }

  const renderTransactionInfo = () => {
    if (transaction.txType === 'deposit') {
      return (
        <div className="flex items-center gap-2">
          <TokenWithNetwork
            className="size-[1.14219rem]"
            symbol={transaction.depositAsset?.contract_ticker_symbol}
            network={Number(transaction.depositAsset?.chain_id)}
          />
          <img src={arrowNext} className="w-[0.40006rem]" alt="arrow-right" />
          <TokenWithNetwork
            className="size-[1.14219rem]"
            symbol={transaction.vault}
            network={CHAIN_IDS_BY_NAME.Arbitrum}
          />
          <div className="flex items-center gap-1 rounded-[12.5rem] bg-green-15 px-2 py-1 leading-[120%] text-green-100">
            + {formatAmountValue(transaction.inputValue, 2)}{' '}
            {transaction.depositAsset?.contract_ticker_symbol}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <TokenWithNetwork
          className="size-[1.14219rem]"
          symbol={transaction.mtToken?.symbol}
          network={transaction.mtToken?.chainId}
        />
        <div className="bg-red-15 flex items-center gap-1 rounded-[12.5rem] px-2 py-1 leading-[120%]">
          {formatAmountValue(transaction.inputValue, 2)} {transaction.vault}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex w-[17.5rem] cursor-pointer flex-col items-start gap-4 overflow-hidden rounded-2xl bg-[#FFF] p-6 pt-4',
        {
          'bg-[#F7EDF1]': transaction.status === 'error',
        },
      )}
      onClick={() => onClick(transaction)}
    >
      <div className="flex w-full items-center justify-between">
        <h3
          className={cn(
            'flex items-center gap-2 text-center text-[1.125rem] leading-[120%] text-text-90',
            {
              'text-red-100': transaction.status === 'error',
            },
          )}
        >
          {transaction.status === 'error' && <ErrorCircle className="size-6" />}
          <span>{transaction.txType === 'deposit' ? 'Deposit' : 'Withdraw'} </span>
          <span>{statusText[transaction.status as keyof typeof statusText]}</span>
        </h3>
        <Expand className="size-6" />
      </div>
      {renderTransactionInfo()}
      {transaction.status === 'pending' && (
        <Lottie
          animationData={loader}
          className="absolute -bottom-4 left-0 w-full -scale-y-100 opacity-10"
        />
      )}
      {transaction.status !== 'pending' && (
        <img
          src={rainbow}
          alt="rainbow"
          className="absolute bottom-[-5.1rem] right-[-5.1rem] size-[10.25rem] animate-[spin_15s_linear_infinite] opacity-90"
        />
      )}
    </motion.div>
  )
}

export const PendingTransactions: React.FC = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const { transactions } = useTransactionStore()
  const { setCurrentModal, setTransactionData } = useTxStore()
  useTransactionStatusChecker()
  const [isHovered, setIsHovered] = useState(false)

  if (isBelowDesktop) {
    return null
  }

  const handleTransactionClick = (transaction: IPendingTransactionData) => {
    console.log('🚀 ~ handleTransactionClick ~ transaction:', transaction)
    setTransactionData(transaction)

    switch (transaction.status) {
      case 'pending': {
        setCurrentModal('review')
        break
      }
      case 'success': {
        setCurrentModal('done')
        break
      }
      case 'error': {
        setCurrentModal('error')
        break
      }
      default: {
        console.warn(`Unknown transaction status: ${transaction.status}`)
        break
      }
    }
  }

  return (
    <motion.div
      className="fixed bottom-0 right-0 h-full overflow-y-auto overflow-x-hidden px-10 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isHovered ? 1 : 0.7,
        x: isHovered ? 0 : 'calc(100% - 6.5rem)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-3 py-32">
        <AnimatePresence>
          {transactions.map((tx) => (
            <CollapsedTransaction
              key={tx.id}
              transaction={tx}
              onClick={handleTransactionClick}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
