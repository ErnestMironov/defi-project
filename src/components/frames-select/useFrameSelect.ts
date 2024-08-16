import dayjs from 'dayjs'
import { useState } from 'react'

const FRAMES = ['1D', '1W', '1M', '3M', 'MAX']
export type FrameType = (typeof FRAMES)[number]

export const useFrameSelect = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(1)
  const [currentFrame, setCurrentFrame] = useState<FrameType>('MAX')
  const onFrameChange = (frame: FrameType) => {
    setCurrentFrame(frame)
    switch (frame) {
      case '1D': {
        setCurrentTimestamp(dayjs().subtract(1, 'day').valueOf())
        break
      }
      case '1W': {
        setCurrentTimestamp(dayjs().subtract(1, 'week').valueOf())
        break
      }
      case '1M': {
        setCurrentTimestamp(dayjs().subtract(1, 'month').valueOf())
        break
      }
      case '3M': {
        setCurrentTimestamp(dayjs().subtract(3, 'month').valueOf())
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
  return { currentTimestamp, currentFrame, onFrameChange, frames: FRAMES }
}
