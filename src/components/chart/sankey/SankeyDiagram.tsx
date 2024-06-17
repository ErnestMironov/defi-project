/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as am5 from '@amcharts/amcharts5'
import { Sankey } from '@amcharts/amcharts5/flow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import Aave from '@assets/icons/aave.svg?url'
import Arbitrum from '@assets/icons/arbitrum.svg?url'
import Lendle from '@assets/icons/lendle.svg?url'
import Mantle from '@assets/icons/mantle.svg?url'
import Metis from '@assets/icons/metis.svg?url'
import Usdt from '@assets/icons/tokens/usdt.svg'
import clsx from 'clsx'
import { useLayoutEffect, useRef, useState } from 'react'

export const SankeyDiagram = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipContent, setTooltipContent] = useState<any>({
    from: '',
    to: '',
    value: '',
  })
  const tooltipReference = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv')

    root.setThemes([am5themes_Animated.new(root)])
    const series = root.container.children.push(
      Sankey.new(root, {
        sourceIdField: 'from',
        targetIdField: 'to',
        valueField: 'value',
        // paddingRight: 50,
        paddingBottom: 25,
      }),
    )
    series.links.template.setAll({
      tooltipText: '',
      fillOpacity: 0.5,
      ariaValueText: '',
    })
    series.nodes.setAll({
      nameField: 'name',
    })
    let isOverTooltip = false
    series.links.template.events.on('pointerover', function (e) {
      setIsOpen(!isOpen)
      const { target, point } = e
      const { dataItem } = target
      const { from, to, value } = dataItem?.dataContext as any
      const tooltip = tooltipReference.current

      if (tooltip) {
        tooltip.getBoundingClientRect()
        const tooltipRect = tooltip.getBoundingClientRect()
        const chartRect = document.querySelector('#chartdiv')?.getBoundingClientRect()
        const chartWidth = chartRect?.width as number
        const chartHeight = chartRect?.height as number

        let top = point.y
        let left = point.x

        if (top + tooltipRect.height > chartHeight) {
          top = chartHeight - tooltipRect.height
        }
        if (left + tooltipRect.width > chartWidth) {
          left = chartWidth - tooltipRect.width
        }
        if (point.x > chartWidth / 2) {
          left = point.x - tooltipRect.width
        }

        // Apply the new position to the tooltip
        tooltip.style.top = `${top}px`
        tooltip.style.left = `${left}px`
        setTooltipContent({ from, to, value })

        tooltip.addEventListener('mouseover', function () {
          isOverTooltip = true
          setIsOpen(true)
        })
        tooltip.addEventListener('mouseout', function () {
          isOverTooltip = false
          setIsOpen(false)
        })
      }
    })
    series.links.template.events.on('pointerout', function () {
      if (!isOverTooltip) {
        setIsOpen(false)
      }
    })

    series.nodes.get('colors')?.setAll({ step: 2 })

    series.nodes.nodes.template.setup = function (node) {
      series.nodes.labels.template.set('visible', false)
      const picture = node.children.push(
        am5.Picture.new(root, {
          width: 25,
          height: 25,
          y: am5.p50,
          x: 30,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const picture2 = node.children.push(
        am5.Picture.new(root, {
          width: 25,
          height: 25,
          y: am5.percent(50),
          x: 179,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const text1 = node.children.push(
        am5.Label.new(root, {
          width: 100,

          y: am5.percent(50),
          x: 100,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const text2 = node.children.push(
        am5.Label.new(root, {
          width: 100,

          y: am5.percent(50),
          x: 250,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const pictureRight = node.children.push(
        am5.Picture.new(root, {
          width: 25,
          height: 25,
          y: am5.p50,
          x: -290,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const picture2Right = node.children.push(
        am5.Picture.new(root, {
          width: 25,
          height: 25,
          y: am5.p50,
          x: -140,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const text1Right = node.children.push(
        am5.Label.new(root, {
          width: 100,

          y: am5.percent(50),
          x: -220,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )
      const text2Right = node.children.push(
        am5.Label.new(root, {
          width: 100,

          y: am5.percent(50),
          x: -70,
          centerY: am5.p50,
          centerX: am5.p50,
        }),
      )

      node.events.on('dataitemchanged', function (e) {
        const { dataItem } = e.target
        if (dataItem) {
          if (['J', 'D'].includes((dataItem.dataContext as any).id)) {
            pictureRight.set('src', (dataItem.dataContext as any).src1)
            picture2Right.set('src', (dataItem.dataContext as any).src2)
            text1Right.set('text', `[#000]${(dataItem.dataContext as any).text1}`)
            text2Right.set('text', `[#000]${(dataItem.dataContext as any).text2}`)
          } else {
            picture.set('src', (dataItem.dataContext as any).src1)
            picture2.set('src', (dataItem.dataContext as any).src2)
            text1.set('text', `[#000]${(dataItem.dataContext as any).text1}`)
            text2.set('text', `[#000]${(dataItem.dataContext as any).text2}`)
          }
        }
      })
    }
    series.nodes.rectangles.template.setAll({
      fillOpacity: 0.5,
      strokeWidth: 1,
      // cornerRadiusTL: 4,
      // cornerRadiusTR: 12,
      // cornerRadiusBL: 4,
      // cornerRadiusBR: 12,
    })

    series.nodes.data.setAll([
      {
        id: 'A',
        src1: Mantle,
        src2: Aave,
        text1: 'MANTLE',
        text2: 'AAVE V3',
      },
      {
        id: 'B',
        src1: Metis,
        src2: Aave,
        text1: 'METIS',
        text2: 'AAVE V3',
      },
      {
        id: 'C',
        src1: Arbitrum,
        src2: Aave,
        text1: 'ARBITRUM',
        text2: 'AAVE V3',
      },
      {
        id: 'D',
        src1: Mantle,
        src2: Lendle,
        text1: 'MANTLE',
        text2: 'LENDLE',
      },
      {
        id: 'E',
        src1: Metis,
        src2: Lendle,
        text1: 'METIS',
        text2: 'LENDLE',
      },
      {
        id: 'G',
        src1: Mantle,
        src2: Lendle,
        text1: 'MANTLE',
        text2: 'LENDLE',
      },
      {
        id: 'H',
        src1: Metis,
        src2: Aave,
        text1: 'METIS',
        text2: 'AAVE V3',
      },
      {
        id: 'I',
        src1: Metis,
        src2: Aave,
        text1: 'METIS',
        text2: 'AAVE V3',
      },
      {
        id: 'J',
        src1: Metis,
        src2: Aave,
        text1: 'METIS',
        text2: 'AAVE V3',
      },
    ])
    series.data.setAll([
      { from: 'A', to: 'J', value: 10 },
      { from: 'B', to: 'J', value: 8 },
      { from: 'B', to: 'J', value: 4 },
      { from: 'C', to: 'J', value: 3 },
      // { from: 'D', to: 'G', value: 5 },
      // { from: 'D', to: 'I', value: 2 },
      // { from: 'D', to: 'H', value: 3 },
      { from: 'E', to: 'D', value: 6 },
      { from: 'G', to: 'D', value: 5 },
      { from: 'I', to: 'J', value: 1 },
      { from: 'H', to: 'J', value: 9 },
    ])

    series.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div className="relative">
      <div id="chartdiv" className="h-[36.2rem] w-full" />
      <div
        ref={tooltipReference}
        className={clsx(
          'absolute z-10 flex flex-col flex-nowrap gap-5 rounded-2xl bg-white px-5 py-4 text-black shadow-md transition-all duration-300 ease-in-out [box-shadow:0px_2.556px_5.111px_0px_rgba(0,_0,_0,_0.04)]',
          isOpen ? 'opacity-1' : 'opacity-0',
        )}
      >
        <div className="flex items-center gap-2">
          <Usdt className="size-6 overflow-visible" />
          <p className="text-[1.375rem]">{tooltipContent.value}</p>
        </div>
        <div className="text-base text-text-80">
          <div className="flex items-center">
            <span>800.98%</span>
            <span className="mx-2">{'->'}</span>
            <span>834.71%</span>
            <span className="ml-1">APY</span>
          </div>
          <div className="mt-2">
            <span>5 days ago</span>
            <span className="ml-2">(21.05.24 22:12)</span>
          </div>
        </div>
        <div className="text-blue1">View on Explorer</div>
      </div>
    </div>
  )
}
