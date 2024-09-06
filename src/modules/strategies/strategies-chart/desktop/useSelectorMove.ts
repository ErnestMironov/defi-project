import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export const useSelectorMove = () => {
  const [chartDistance, setChartDistance] = useState(0)
  const containerReference = useRef<HTMLDivElement>(null)
  const firstChartReference = useRef<HTMLDivElement>(null)
  const secondChartReference = useRef<HTMLDivElement>(null)
  const selectReference = useRef<HTMLDivElement>(null)
  const isFirstChartInView = useInView(firstChartReference, { amount: 0.8 })
  const isSecondChartInView = useInView(secondChartReference, { amount: 0.3 })

  useEffect(() => {
    if (firstChartReference.current && secondChartReference.current) {
      const distance =
        secondChartReference.current.offsetTop - firstChartReference.current.offsetTop
      setChartDistance(distance)
    }
  }, [])

  const shouldMoveSelect = isSecondChartInView && !isFirstChartInView

  return {
    shouldMoveSelect,
    chartDistance,
    containerReference,
    firstChartReference,
    secondChartReference,
    selectReference,
  }
}
