import { useOverview } from '@api/queries/getOverview'
import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import React from 'react'

export interface IOverviewCard {
  title: string
  logoColor: string
  stats: Array<{ [key: string]: string | number | undefined }>
}

const Overview: React.FC<{ data: IOverviewCard }> = ({ data }) => {
  return (
    <div className="flex snap-center flex-col gap-6 rounded-2xl bg-cards px-4 py-5 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] max-lg:min-w-[90vw] lg:flex-1 lg:gap-14 lg:rounded-[1.75rem] lg:px-12 lg:py-10">
      <h3 className="flex items-center gap-[0.69rem] text-base/[0] uppercase tracking-[0.015rem] lg:gap-4 lg:text-[1.5rem]">
        <Logo
          className="h-[1.625rem] w-[2.0625rem] lg:h-[1.5625rem] lg:w-[4.1875rem]"
          fill={data.logoColor}
        />
        {data.title}
      </h3>
      <div className="gap-8 max-lg:grid max-lg:w-full max-lg:grid-cols-[repeat(3,4.9375rem)] lg:flex lg:gap-[4.5rem]">
        {data.stats.map((stat) => (
          <div key={stat.title} className="flex flex-col gap-2 lg:tracking-[0.015rem]">
            <div className="text-[0.75rem] uppercase text-gray-100 max-lg:h-7 lg:text-lg">
              {stat.title}
            </div>
            <div className="text-[1.5rem] leading-[120%] lg:text-[2.375rem]">
              {stat?.prefix}
              {stat.value}
              {stat?.postfix}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Overviews: React.FC<React.ComponentProps<'div'>> = (props) => {
  const { data, loading, error } = useOverview()

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const overviewsData: IOverviewCard[] = [
    {
      title: 'User Overview',
      logoColor: '#79DEC2',
      stats: [
        {
          title: 'Deposited',
          value: data.userOverview.deposited,
          prefix: '$',
        },
        {
          title: 'Monthly Yield',
          value: data.userOverview.yeald,
          prefix: '$',
        },
        {
          title: 'Average APY',
          value: data.userOverview.apy,
          postfix: '%',
        },
      ],
    },
    {
      title: 'MAAT Overview',
      logoColor: 'currentColor',
      stats: [
        {
          title: 'TVL',
          value: data.maatOverview.tvl,
          prefix: '$',
        },
        {
          title: 'Cumulative Earnings',
          value: data.maatOverview.cumulativeEarnings,
          prefix: '$',
        },
        {
          title: 'Strategies',
          value: data.maatOverview.strategies,
        },
      ],
    },
  ]

  return (
    <div
      className={clsx(
        'hide-scrollbar flex w-full gap-2 max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-[0.38rem] lg:gap-4',
        props.className,
      )}
    >
      {overviewsData.map((overview) => (
        <Overview key={overview.title} data={overview} />
      ))}
    </div>
  )
}
