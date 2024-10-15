import alarmSound from '@assets/audio/8-bit_Crash.mp3' // Убедись, что путь правильный
import GuidanceArrow from '@assets/icons/guidance-arrow.svg'
import Scales from '@assets/lottie/MAAT_Scales.json'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { formatAmount, parseFloatLocale } from '@utils/formatValue'
import Lottie from 'lottie-react'
import { useEffect, useRef, useState } from 'react'

import { useTxStore } from '../store/useTxStore'

interface TxReviewInfoProperties {
  playAnimation: boolean
  items: {
    label: string
    value: string | number
    usdValue: string | number
    tokenData: {
      symbol: string
      network: ChainType
      maxDigits?: number
    }
  }[]
}

export const TxReviewInfo = ({ items, playAnimation }: TxReviewInfoProperties) => {
  const { brakeBalance, setBrakeBalance, scalesClickCount, setScalesClickCount } =
    useTxStore()
  const type = items?.length === 1 ? 'single' : 'multiple'
  const [isRed, setIsRed] = useState(false)
  const [isFalling, setIsFalling] = useState(false)
  const audioReference = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (scalesClickCount >= 20) {
      setBrakeBalance(true)
    }
  }, [scalesClickCount, setBrakeBalance])

  useEffect(() => {
    audioReference.current = new Audio(alarmSound)
    audioReference.current.loop = false
  }, [])

  useEffect(() => {
    if (brakeBalance) {
      if (audioReference.current) {
        audioReference.current
          .play()
          .then(() => {
            setIsRed(true)
          })
          .catch((error) => console.error('Failed to play audio:', error))
      }
      const fallTimeout = setTimeout(() => setIsFalling(true), 1000)
      return () => clearTimeout(fallTimeout)
    }
    setIsRed(false)
    setIsFalling(false)
    if (audioReference.current) {
      audioReference.current.pause()
      audioReference.current.currentTime = 0
    }
  }, [brakeBalance])

  const handleScalesClick = () => {
    setScalesClickCount(scalesClickCount + 1)
  }

  const renderScales = () => (
    <div className="flex justify-center" onClick={handleScalesClick}>
      <Lottie
        animationData={Scales}
        loop={playAnimation}
        autoplay={playAnimation}
        className="aspect-square size-[8.4375rem] self-center transition-all duration-1000 lg:h-28"
        style={{
          filter: isRed ? 'sepia(1) saturate(10000%) hue-rotate(0deg)' : 'none',
          transform: isFalling ? 'translateY(60vh)' : 'none',
        }}
      />
    </div>
  )

  if (type === 'single') {
    return (
      <>
        {renderScales()}
        <div className="flex items-center gap-2 self-center text-[1.125rem] ">
          <TokenWithNetwork
            symbol={items[0].tokenData.symbol}
            network={items[0].tokenData.network}
            position="bottom-right"
            width="1.5rem"
          />
          <span>
            {formatAmount(items[0].value, {
              minimumFractionDigits: items[0].tokenData.maxDigits ?? 2,
              maximumFractionDigits: items[0].tokenData.maxDigits ?? 2,
            })}{' '}
            {items[0].tokenData.symbol.toUpperCase()}
          </span>
          <p className="text-gray-100">
            $ {parseFloatLocale(items[0].usdValue.toString())}
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="max-lg:grid-cols-auto flex items-center gap-x-6 gap-y-8 max-lg:grid lg:justify-between lg:gap-8">
      <div className="flex flex-1 flex-col items-center text-[1.125rem]">
        <span className="text-[0.875rem]">Withdraw</span>
        <div className="mt-3 flex items-center">
          <TokenWithNetwork
            symbol={items[0].tokenData.symbol}
            network={items[0].tokenData.network}
            position="bottom-right"
            className="mr-2"
            width="1.5rem"
          />
          <span>
            {formatAmount(items[0].value, {
              minimumFractionDigits: items[0].tokenData.maxDigits ?? 2,
              maximumFractionDigits: items[0].tokenData.maxDigits ?? 2,
            })}{' '}
            {items[0].tokenData.symbol.toUpperCase()}
          </span>
        </div>
        <p className="text-[0.875rem] text-gray-100">
          $ {parseFloatLocale(items[0].usdValue.toString())}
        </p>
      </div>

      {renderScales()}

      <GuidanceArrow className="justify-self-center lg:hidden" />
      <div className="flex flex-1 flex-col items-center text-[1.125rem]">
        <span className="text-[0.875rem]">Receive</span>
        <div className="mt-3 flex items-center">
          <TokenWithNetwork
            symbol={items[1].tokenData.symbol}
            network={items[1].tokenData.network}
            position="bottom-right"
            className="mr-2"
            width="1.5rem"
          />
          <span>
            {formatAmount(items[1].value, {
              minimumFractionDigits: items[1].tokenData.maxDigits ?? 2,
              maximumFractionDigits: items[1].tokenData.maxDigits ?? 2,
            })}{' '}
            {items[1].tokenData.symbol.toUpperCase()}
          </span>
        </div>
        <p className="text-[0.875rem] text-gray-100">
          $ {parseFloatLocale(items[1].usdValue.toString())}
        </p>
      </div>
    </div>
  )
}
