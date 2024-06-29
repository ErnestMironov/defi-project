/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { useRebalance } from '@api/queries/useRebalance'
import Arbitrum from '@assets/icons/networks/arbitrum.svg?url'
import Aave from '@assets/icons/protocols/aave.svg?url'
import Lendle from '@assets/icons/protocols/lendle.svg?url'
import Mantle from '@assets/icons/protocols/mantle.svg?url'
import Metis from '@assets/icons/protocols/metis.svg?url'
import { Button } from '@components/ui/button'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { useDimensions } from '@hooks/useDimensions'
import type { SankeyNodeMinimal } from 'd3-sankey'
import { sankey, sankeyCenter, sankeyLinkHorizontal } from 'd3-sankey'
import { Fragment, useEffect, useRef, useState } from 'react'

import { D3TooltipComponent } from './D3Tooltip'

type ObjectsData = {
  name: string
  icon: string
}
export type NodeType = {
  id: string
  objects: ObjectsData[]
}
export type LinkType = {
  source: string
  target: string
  value: number
}
export type SankeyChartDataType = {
  nodes: NodeType[]
  links: LinkType[]
}

export const mockData: SankeyChartDataType = {
  nodes: [
    {
      id: '1',
      objects: [
        { name: 'Mantle', icon: Mantle },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '2',
      objects: [
        { name: 'Metis', icon: Metis },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '3',
      objects: [
        { name: 'Arbitrum', icon: Arbitrum },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '4',
      objects: [
        { name: 'Mantle', icon: Mantle },
        { name: 'Lendle', icon: Lendle },
      ],
    },
    {
      id: '5',
      objects: [
        { name: 'Metis', icon: Metis },
        { name: 'Lendle', icon: Lendle },
      ],
    },
    {
      id: '6',
      objects: [
        { name: 'Arbitrum', icon: Arbitrum },
        { name: 'Lendle', icon: Lendle },
      ],
    },
    {
      id: '7',
      objects: [
        { name: 'Mantle', icon: Mantle },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '8',
      objects: [
        { name: 'Metis', icon: Metis },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '9',
      objects: [
        { name: 'Arbitrum', icon: Arbitrum },
        { name: 'Aave V3', icon: Aave },
      ],
    },
    {
      id: '10',
      objects: [
        { name: 'Mantle', icon: Mantle },
        { name: 'Lendle', icon: Lendle },
      ],
    },
    {
      id: '11',
      objects: [
        { name: 'Lendle', icon: Lendle },
        { name: 'Metis', icon: Metis },
      ],
    },
    {
      id: '12',
      objects: [
        { name: 'Lendle', icon: Lendle },
        { name: 'Arbitrum', icon: Arbitrum },
      ],
    },
  ],
  links: [
    { source: '1', target: '11', value: 10 },
    { source: '2', target: '7', value: 20 },
    { source: '3', target: '12', value: 10 },
    { source: '4', target: '9', value: 20 },
    { source: '4', target: '8', value: 20 },
    { source: '5', target: '8', value: 10 },
    { source: '5', target: '10', value: 10 },
    { source: '6', target: '7', value: 12 },
  ],
}
const COLORS = [
  'rgba(135, 99, 243, 0.30)',
  'rgba(254, 244, 154, 0.45)',
  'rgba(50, 57, 73, 0.23)',
  'rgba(247, 190, 204, 0.40)',
  'rgba(121, 222, 194, 0.35)',
  'rgba(166, 193, 255, 0.75)',
]
const MARGIN_Y = 0
const MARGIN_X = 0

type Data = {
  nodes: { id: string }[]
  links: { source: string; target: string; value: number }[]
}

type SankeyProperties = {
  data: Data
}

export const Sankey = ({ data }: SankeyProperties) => {
  const containerReference = useRef<HTMLDivElement | null>(null)
  const tooltipReference = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [tooltip, setTooltip] = useState<{
    content: string
    x: number
    y: number
  } | null>(null)
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
    .nodeId((node) => (node as NodeType).id)
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
          node={node as SankeyNodeMinimal<{}, {}> & NodeType}
          dimensions={dimensions}
        />
      </Fragment>
    )
  })

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const gradientId = `gradient-${i}`
    const linkGenerator = sankeyLinkHorizontal()
    const path = linkGenerator(link)
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
              // content: `${(link.source as NodeType).id}->${(link.target as NodeType).id}`,
              content: '200,220.20',
              x: e.clientX,
              y: e.clientY,
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
      <D3TooltipComponent
        ref={tooltipReference}
        isOpen={isOpen}
        tooltipContent={{ value: tooltip?.content }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      />
    </>
  )
}

export const SankeyDiagramBasicDemo = () => {
  const { data } = useRebalance()
  // const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)
  const { isBelowDesktop } = useDeviceWidth()
  return (
    <div className="mt-28 max-lg:mt-8 max-lg:px-4">
      {/* <StableSwitcher
        layoutId="stable-switcher-sankey"
        activeTab={activeStableType}
        setActiveTab={setStableType}
        className="mb-[2.13rem] mt-28 max-lg:mb-[1.47rem] max-lg:mt-8"
      /> */}
      {data && <Sankey data={mockData} />}
      {isBelowDesktop && (
        <Button className="mt-8 w-full" size="lg">
          Deposit
        </Button>
      )}
    </div>
  )
}

const Node = ({
  node,
  dimensions,
}: {
  node: SankeyNodeMinimal<{}, {}> & NodeType
  dimensions: { width: number; height: number }
}) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return (
      <g key={node.index}>
        {node.objects.map((object, i) => {
          return (
            <Fragment key={i}>
              <image
                href={object.icon}
                x={
                  (node.x0 as number) < dimensions.width / 2
                    ? (node.x1 as number) + i * 40 + 0
                    : (node.x0 as number) - i * 40 - 30
                }
                y={((node.y1 as number) + (node.y0 as number)) / 2 - 12}
                width={24}
                height={24}
              />
            </Fragment>
          )
        })}
      </g>
    )
  }
  return (
    <g key={node.index}>
      {node.objects.map((object, i) => {
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
              {object.name}
            </text>
            <image
              href={object.icon}
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
      })}
    </g>
  )
}
