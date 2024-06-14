/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-use-before-define */
import Aave from '@assets/icons/aave.svg?url'
import Arbitrum from '@assets/icons/arbitrum.svg?url'
import Lendle from '@assets/icons/lendle.svg?url'
import Mantle from '@assets/icons/mantle.svg?url'
import Metis from '@assets/icons/metis.svg?url'
import { useDimensions } from '@hooks/useDimensions'
import type { SankeyNodeMinimal } from 'd3-sankey'
import { sankey, sankeyCenter, sankeyLinkHorizontal } from 'd3-sankey'
import { useEffect, useRef, useState } from 'react'

import { D3TooltipComponent } from './D3Tooltip'

type ObjectsData = {
  name: string
  icon: string
}
type NodeType = {
  id: string
  objects: ObjectsData[]
}
type LinkType = {
  source: string
  target: string
  value: number
}
type SankeyChartDataType = {
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
    { source: '5', target: '8', value: 10 },
    { source: '5', target: '10', value: 10 },
    { source: '6', target: '7', value: 12 },
  ],
}
const COLORS = [
  'rgba(135, 99, 243, 0.15)',
  'rgba(254, 244, 154, 0.30)',
  'rgba(50, 57, 73, 0.08)',
  'rgba(247, 190, 204, 0.25)',
  'rgba(121, 222, 194, 0.20)',
  'rgba(166, 193, 255, 0.60)',
]
const MARGIN_Y = 25
const MARGIN_X = 5

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
      let left = tooltip.x

      const dimensions = tooltipReference.current?.getBoundingClientRect() as DOMRect
      if (tooltip?.x > (containerReference.current as HTMLDivElement)?.clientWidth / 2) {
        left = tooltip?.x - dimensions?.width
      }
      tooltipReference.current?.style.setProperty('top', `${tooltip.y}px`)
      tooltipReference.current?.style.setProperty('left', `${left}px`)
    }
  }, [tooltip])
  const dimensions = useDimensions(containerReference)
  const sankeyGenerator = sankey()
    .nodeWidth(20)
    .nodePadding(15)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [dimensions.width - MARGIN_X, dimensions.height - MARGIN_Y],
    ])
    .nodeId((node) => (node as NodeType).id)
    .nodeAlign(sankeyCenter)
    .nodeSort(() => +1)

  // Compute nodes and links positions
  const { nodes, links } = sankeyGenerator(data as any)

  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    console.log('node', node)
    const color =
      (node.sourceLinks as any).length > 0
        ? COLORS[(node.index as any) % COLORS.length]
        : COLORS[Number((node as any).id) % COLORS.length]
    return (
      <>
        <g key={node.index}>
          <rect
            height={(node.y1 as number) - (node.y0 as number)}
            width={sankeyGenerator.nodeWidth()}
            x={node.x0}
            y={node.y0}
            stroke="black"
            strokeOpacity={0.1}
            fillOpacity={1}
            fill={color}
            rx={0.9}
          />
        </g>
        <Node
          node={node as SankeyNodeMinimal<{}, {}> & NodeType}
          dimensions={dimensions}
        />
      </>
    )
  })

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal()
    const path = linkGenerator(link)
    console.log('link', link)

    return (
      <path
        key={i}
        d={path || ''}
        stroke={COLORS[(link.source as any).index % COLORS.length]}
        fill="none"
        strokeOpacity={0.5}
        strokeWidth={link.width}
        className="mix-blend-multiply hover:animate-pulse hover:[stroke-opacity:_1]"
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
  return <Sankey data={mockData} />
}

const Node = ({
  node,
  dimensions,
}: {
  node: SankeyNodeMinimal<{}, {}> & NodeType
  dimensions: { width: number; height: number }
}) => {
  return (
    <g key={node.index}>
      {node.objects.map((object, i) => {
        return (
          <>
            <text
              x={
                (node.x0 as number) < dimensions.width / 2
                  ? (node.x1 as number) + 6 + i * 170 + 40
                  : (node.x0 as number) - 6 - i * 170 - 100
              }
              className="text-lg uppercase"
              y={((node.y1 as number) + (node.y0 as number)) / 2}
              dy="0.3em"
              fill="black"
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
          </>
        )
      })}
    </g>
  )
}
