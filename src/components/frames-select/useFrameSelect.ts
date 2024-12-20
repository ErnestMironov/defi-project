import useDeviceWidth from '@hooks/common/useDeviceWidth'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const FRAMES = [
  { id: 'All time', labelDesktop: 'All time', labelMobile: 'All' },
  { id: 'Year', labelDesktop: 'Year', labelMobile: 'Y' },
  { id: 'Month', labelDesktop: 'Month', labelMobile: 'M' },
  { id: 'Week', labelDesktop: 'Week', labelMobile: 'W' },
  { id: 'Day', labelDesktop: 'Day', labelMobile: 'D' },
]
export type FrameType = (typeof FRAMES)[number]['id']

export const useFrameSelect = (initialFrame: FrameType = 'All time') => {
  const { isBelowDesktop } = useDeviceWidth()
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
    frames: isBelowDesktop
      ? FRAMES.map((item) => ({ id: item.id, label: item.labelMobile }))
      : FRAMES.map((item) => ({ id: item.id, label: item.labelDesktop })),
  }
}

export type FrameSelect = ReturnType<typeof useFrameSelect>
