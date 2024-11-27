import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const FRAMES = ['All time', 'Year', 'Month', 'Week', 'Day']
export type FrameType = (typeof FRAMES)[number]

export const useFrameSelect = (initialFrame: FrameType = 'All time') => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(1)
  const [currentFrame, setCurrentFrame] = useState<FrameType>(initialFrame)

  useEffect(() => {
    onFrameChange(initialFrame)
  }, [initialFrame])

  const onFrameChange = (frame: FrameType) => {
    setCurrentFrame(frame)
    switch (frame) {
      case 'Day': {
        setCurrentTimestamp(dayjs().subtract(1, 'day').unix())
        break
      }
      case 'Week': {
        setCurrentTimestamp(dayjs().subtract(1, 'week').unix())
        break
      }
      case 'Month': {
        setCurrentTimestamp(dayjs().subtract(1, 'month').unix())
        break
      }
      case 'Year': {
        setCurrentTimestamp(dayjs().subtract(1, 'year').unix())
        break
      }
      // case '3M': {
      //   setCurrentTimestamp(dayjs().subtract(3, 'month').unix())
      //   break
      // }
      case 'All time': {
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
