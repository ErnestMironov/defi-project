import { TooltipComponent } from '@components/chart/line-chart/TooltipComponent'
import type { FrameType } from '@components/frames-select/useFrameSelect'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import dayjs from 'dayjs'
import {
  Area,
  AreaChart as AreaChartComponent,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const COLORS = ['#6160FF', '#A6C1FF'] as const
type ColorType = (typeof COLORS)[number]
export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

export interface AreaChartComponentProperties {
  data?: RechartDataType[]
  frame?: FrameType
  className?: string
  yAxisType?: 'percent' | 'usd'
  color: ColorType
}

export const AreaChart = (props: AreaChartComponentProperties) => {
  const { data, frame, className, yAxisType, color } = props
  const tooltipFormatter = (value: string) =>
    yAxisType === 'usd'
      ? formatUsdValue(value, { notation: 'compact' })
      : formatPercentValue(value)

  const tickFormatter = (value: string) => {
    let format: string = 'MMM'
    switch (frame) {
      case '1D': {
        format = 'HH:mm'
        break
      }
      case '1W': {
        format = 'ddd'
        break
      }
      default: {
        format = 'DD MMM'
        break
      }
    }
    return dayjs(value).format(format)
  }

  return (
    <div className={cn('size-full', className)}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="[&_.recharts-cartesian-axis-line]:stroke-slate-500/20  [&_.recharts-cartesian-grid-horizontal_line:first-child]:opacity-0 [&_.recharts-cartesian-grid-horizontal_line:last-child]:translate-y-[0.05rem]"
      >
        <AreaChartComponent
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.5} vertical={false} />
          <XAxis
            tickLine={false}
            dataKey="timestamp"
            tickFormatter={tickFormatter}
            className="text-[0.8125rem] [&_text]:fill-gray-100"
            minTickGap={40}
            tickCount={10}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={5}
            tickFormatter={(value) => (value === 0 ? '' : tooltipFormatter(value))}
            className="text-[0.8125rem] [&_text]:fill-gray-100"
            interval="preserveStartEnd"
          />
          <Tooltip
            content={({ active, payload, coordinate }) => {
              if (active && payload && payload.length > 0 && coordinate) {
                return (
                  <TooltipComponent
                    formatter={tooltipFormatter}
                    data={payload.map((item) => ({
                      timestamp: payload[0].payload.timestamp,
                      symbol: 'USDT',
                      chain: 'BASE',
                      protocol: 'Beefy',
                      color: item.color || '',
                      value: item.value,
                    }))}
                  />
                )
              }

              return null
            }}
          />
          <Area
            key={color}
            type="monotone"
            connectNulls
            dataKey="value"
            stroke={color}
            fill={`url(#color-${color})`}
          />
          <defs>
            <linearGradient key={color} id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="45%" stopColor={color} stopOpacity={0.45} />
              <stop offset="100%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
          </defs>
        </AreaChartComponent>
      </ResponsiveContainer>
    </div>
  )
}
