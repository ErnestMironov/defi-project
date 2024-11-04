import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const FRAMES = ['1D', '1W', '1M', '3M', 'MAX']
export type FrameType = (typeof FRAMES)[number]

export const useFrameSelect = (initialFrame: FrameType = '1M') => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(1)
  const [currentFrame, setCurrentFrame] = useState<FrameType>(initialFrame)

  useEffect(() => {
    onFrameChange(initialFrame)
  }, [initialFrame])

  const onFrameChange = (frame: FrameType) => {
    setCurrentFrame(frame)
    switch (frame) {
      case '1D': {
        setCurrentTimestamp(dayjs().subtract(1, 'day').unix())
        break
      }
      case '1W': {
        setCurrentTimestamp(dayjs().subtract(1, 'week').unix())
        break
      }
      case '1M': {
        setCurrentTimestamp(dayjs().subtract(1, 'month').unix())
        break
      }
      case '3M': {
        setCurrentTimestamp(dayjs().subtract(3, 'month').unix())
        break
      }
      case 'MAX': {
        setCurrentTimestamp(1)
        break
      }
      default: {
        break
      }
    }
  }
  return {
    currentTimestamp,
    currentFrame,
    onFrameChange,
    frames: FRAMES,
  }
}

export type FrameSelect = ReturnType<typeof useFrameSelect>
