/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */

import { useLastRebalances } from '@api/queries/useLastRebalances'
import Arrow from '@assets/icons/curve-arrow-down.svg?url'
import Arbitrum from '@assets/icons/networks/arbitrum.svg?url'
import Avalanche from '@assets/icons/networks/avalanche.svg?url'
import Base from '@assets/icons/networks/base.svg?url'
import Bsc from '@assets/icons/networks/bsc.svg?url'
import Optimism from '@assets/icons/networks/optimism.svg?url'
import Polygon from '@assets/icons/networks/polygon.svg?url'
import Aave from '@assets/icons/protocols/aave.svg?url'
import Harvest from '@assets/icons/protocols/harvest.svg?url'
import Mantle from '@assets/icons/protocols/mantle.svg?url'
import Metis from '@assets/icons/protocols/metis.svg?url'
import Stargate from '@assets/icons/protocols/stargate.svg?url'
import Yearn from '@assets/icons/protocols/yearn.svg?url'
import { SectionTitle } from '@components/section/SectionTitle'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Skeleton } from '@components/ui/skeleton'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useDimensions } from '@hooks/common/useDimensions'
import { cn } from '@utils/cn'
import type { SankeyLinkMinimal, SankeyNodeMinimal } from 'd3-sankey'
import { sankey, sankeyCenter, sankeyLinkHorizontal } from 'd3-sankey'
import type { ComponentProps } from 'react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

import type { SankeyTooltipContentType } from './D3Tooltip'
import { D3TooltipComponent } from './D3Tooltip'
import type { SankeyNodeType } from './getSankeyData'
import { getSankeyData } from './getSankeyData'

export type LinkType = {
  source: string
  target: string
  value: number
}
export type SankeyChartDataType = {
  nodes: SankeyNodeType[]
  links: LinkType[]
}

export type GeneratedSankeyLink = {
  index: number
  source: SankeyNodeType
  target: SankeyNodeType
  value: number
  width: number
  y0: number
  y1: number
}

const ICON_URLS_MAP = {
  aave: Aave,
  yearn: Yearn,
  stargate: Stargate,
  harvest: Harvest,
  42_161: Arbitrum,
  8453: Base,
  1088: Metis,
  5000: Mantle,
  10: Optimism,
  43_114: Avalanche,
  137: Polygon,
  56: Bsc,
} as const

const getAssetUrl = (id: string) => {
  return Object.entries(ICON_URLS_MAP).find(([key]) =>
    id.toString().match(new RegExp(key, 'i')),
  )?.[1]
}

const COLORS = [
  'rgba(135, 99, 243, 0.30)',
  'rgba(254, 244, 154, 0.45)',
  'rgba(38, 41, 218, 0.23)',
  'rgba(247, 190, 204, 0.40)',
  'rgba(121, 222, 194, 0.35)',
  'rgba(166, 193, 255, 0.75)',
]
const MARGIN_Y = 20
const MARGIN_X = 0

type Data = {
  nodes: SankeyNodeType[]
  links: { source: number; target: number; value: number | null }[]
}

type SankeyProperties = {
  data: Data
}

export const Sankey = ({ data }: SankeyProperties) => {
  const containerReference = useRef<HTMLDivElement | null>(null)
  const tooltipReference = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [tooltip, setTooltip] = useState<SankeyTooltipContentType | null>(null)
  useEffect(() => {
    if (tooltip) {
      const dimensions = tooltipReference.current?.getBoundingClientRect() as DOMRect
      let left = Math.min(
        tooltip.x,
        document.documentElement.clientWidth - dimensions.width,
      )
      const top = Math.min(
        tooltip.y + window.scrollY,
        document.documentElement.clientHeight - dimensions.height + window.scrollY,
      )

      if (tooltip?.x > (containerReference.current as HTMLDivElement)?.clientWidth / 2) {
        left = Math.max(0, tooltip?.x - dimensions?.width)
      }

      tooltipReference.current?.style.setProperty('top', `${top}px`)
      tooltipReference.current?.style.setProperty('left', `${left}px`)
    }
  }, [tooltip])
  const dimensions = useDimensions(containerReference)
  const sankeyGenerator = sankey()
    .nodeWidth(10)
    .nodePadding(15)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [dimensions.width - MARGIN_X, dimensions.height - MARGIN_Y],
    ])
    .nodeId((node) => (node as SankeyNodeType).sankey_id)
    .nodeAlign(sankeyCenter)
  // .nodeSort(() => +1)

  // Compute nodes and links positions
  const { nodes, links } = sankeyGenerator(data as any)
  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    const color1 = COLORS[Number(node.index as any) % COLORS.length]
    const color2 = COLORS[Number(node.index as any) % COLORS.length]

    const color = (node.sourceLinks as any).length > 0 ? color1 : color2
    return (
      <Fragment key={node.index}>
        <g>
          <rect
            height={(node.y1 as number) - (node.y0 as number)}
            width={sankeyGenerator.nodeWidth()}
            x={node.x0}
            y={node.y0}
            stroke="black"
            strokeOpacity={0}
            fillOpacity={1}
            fill={color}
            rx={1}
          />
        </g>
        <Node
          node={node as SankeyNodeMinimal<{}, {}> & SankeyNodeType}
          dimensions={dimensions}
        />
      </Fragment>
    )
  })

  //
  // Draw the links
  //
  const allLinks = (links as GeneratedSankeyLink[]).map((link, i) => {
    const gradientId = `gradient-${i}`
    const linkGenerator = sankeyLinkHorizontal()
    const path = linkGenerator(link as SankeyLinkMinimal<{}, {}>)
    const color1 = COLORS[Number((link.source as any).index) % COLORS.length]
    const color2 = COLORS[Number((link.target as any).index) % COLORS.length]
    return (
      <g key={i}>
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={(link.source as any).x1}
            y1={0}
            x2={(link.target as any).x0}
            y2={0}
          >
            <stop offset="0" stopColor={color1} />
            <stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
        <path
          d={path || ''}
          stroke={`url(#${gradientId})`}
          fill="none"
          strokeOpacity={1}
          strokeWidth={link.width}
          className="hover:animate-pulse hover:[stroke-opacity:_1]"
          // strokeLinecap="round"
          onMouseEnter={(e) => {
            setIsOpen(true)
            setTooltip({
              x: e.clientX,
              y: e.clientY,
              ...link,
            })
          }}
          onMouseLeave={() => setIsOpen(false)}
        />
      </g>
    )
  })

  return (
    <>
      <div className="h-[36.1875rem] w-full" ref={containerReference}>
        <svg className="size-full">
          {allLinks}
          {allNodes}
        </svg>
      </div>
      {tooltip && (
        <D3TooltipComponent
          ref={tooltipReference}
          isOpen={isOpen}
          tooltipContent={tooltip}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

interface SankeyDiagramBasicDemoProperties extends ComponentProps<'div'> {}

export const RebalanceChart = (props: SankeyDiagramBasicDemoProperties) => {
  const { className, ...rest } = props
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)
  const { data, isLoading, error } = useLastRebalances()

  const sankeyData = useMemo(
    () => getSankeyData({ data, activeStableType }),
    [data, activeStableType],
  )

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case !!error: {
        return <Skeleton className="h-[18.4375rem] rounded-3xl lg:h-[36.1875rem]" />
      }
      case !sankeyData?.links?.length: {
        return (
          <div className="flex h-[18.4375rem] items-center justify-center rounded-3xl bg-cards shadow-md lg:h-[36.1875rem]">
            No rebalance data was found.
          </div>
        )
      }
      default: {
        return <Sankey data={sankeyData} />
      }
    }
  }
  return (
    <section className={cn('max-lg:mt-16', className)} {...rest}>
      <SectionTitle className="whitespace-nowrap">Check how we rebalance</SectionTitle>
      <StableSwitcher
        activeTab={activeStableType}
        onTabChange={(value) => setStableType(value as StableType)}
        className="mb-4 mt-[3.06rem] max-lg:my-6"
        classNames={{
          tab: 'w-[12.5rem] max-lg:w-[7.75rem]',
        }}
      />
      {renderBody()}
    </section>
  )
}

const Node = ({
  node,
  dimensions,
}: {
  node: SankeyNodeMinimal<{}, {}> & SankeyNodeType
  dimensions: { width: number; height: number }
}) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    if (node.action_type === 'BRIDGE') {
      return (
        <g key={node.index}>
          <image
            href={getAssetUrl(node.src_chain_id.toString())}
            x={(node?.x1 ?? 0) - 24 * 2}
            y={((node.y1 as number) + (node.y0 as number)) / 2 - 14}
            width={24}
            height={24}
          />
          <image
            href={Arrow}
            x={(node?.x1 ?? 0) - 32 / 2}
            y={((node.y1 as number) + (node.y0 as number)) / 2 - 32 / 2}
            width={32}
            height={32}
            transform={`rotate(-90, ${(node?.x1 ?? 0) - 32 / 2 + 14}, ${
              ((node.y1 as number) + (node.y0 as number)) / 2
            })`}
          />
          <image
            href={getAssetUrl(node.dst_chain_id?.toString() ?? '')}
            x={(node.x1 ?? 0) + 24}
            y={((node.y1 as number) + (node.y0 as number)) / 2 - 14}
            width={24}
            height={24}
          />
        </g>
      )
    }
    return (
      <g key={node.index}>
        {[node.src_chain_id, node?.strategy?.protocol ?? node.dst_chain_id].map(
          (object, i) => {
            const assetUrl = Object.entries(ICON_URLS_MAP).find(([key]) =>
              object.toString().match(new RegExp(key, 'i')),
            )?.[1]
            return (
              <Fragment key={i}>
                <image
                  href={assetUrl}
                  x={
                    (node.x0 as number) < dimensions.width / 2
                      ? (node.x1 as number) + i * 40 + 6
                      : (node.x0 as number) - i * 40 - 30
                  }
                  y={((node.y1 as number) + (node.y0 as number)) / 2 - 12}
                  width={24}
                  height={24}
                />
              </Fragment>
            )
          },
        )}
      </g>
    )
  }
  if (node.action_type === 'BRIDGE') {
    return (
      <g key={node.index}>
        <image
          href={getAssetUrl(node.src_chain_id.toString())}
          x={(node?.x1 ?? 0) - 28 * 2}
          y={((node.y1 as number) + (node.y0 as number)) / 2 - 14}
          width={28}
          height={28}
        />
        <image
          href={Arrow}
          x={(node?.x1 ?? 0) - 40 / 2}
          y={((node.y1 as number) + (node.y0 as number)) / 2 - 40 / 2}
          width={40}
          height={40}
          transform={`rotate(-90, ${(node?.x1 ?? 0) - 28 / 2 + 14}, ${
            ((node.y1 as number) + (node.y0 as number)) / 2
          })`}
        />
        <image
          href={getAssetUrl(node.dst_chain_id?.toString() ?? '')}
          x={(node.x1 ?? 0) + 25}
          y={((node.y1 as number) + (node.y0 as number)) / 2 - 14}
          width={28}
          height={28}
        />
      </g>
    )
  }
  return (
    <g key={node.index}>
      {[node.src_chain_id, node?.strategy?.protocol ?? node.dst_chain_id].map(
        (object, i) => {
          const assetUrl = Object.entries(ICON_URLS_MAP).find(([key]) =>
            object.toString().match(new RegExp(key, 'i')),
          )?.[1]

          return (
            <Fragment key={i}>
              <text
                x={
                  (node.x0 as number) < dimensions.width / 2
                    ? (node.x1 as number) + 6 + i * 170 + 40
                    : (node.x0 as number) - 6 - i * 170 - 100
                }
                className="fill-text text-lg uppercase"
                y={((node.y1 as number) + (node.y0 as number)) / 2}
                dy="0.3em"
              >
                {CHAIN_NAMES_BY_ID[object as keyof typeof CHAIN_NAMES_BY_ID] || object}
              </text>
              <image
                href={assetUrl}
                x={
                  (node.x0 as number) < dimensions.width / 2
                    ? (node.x1 as number) + i * 170 + 10
                    : (node.x0 as number) - i * 170 - 140
                }
                y={((node.y1 as number) + (node.y0 as number)) / 2 - 14}
                width={28}
                height={28}
              />
            </Fragment>
          )
        },
      )}
    </g>
  )
}
