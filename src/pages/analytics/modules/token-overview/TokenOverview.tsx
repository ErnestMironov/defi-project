import Arrow from '@assets/icons/link-arrow.svg'
import usdc from '@assets/images/usdc-3d.png'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { BaseContainer } from './BaseContainer'
// import usdt from '@assets/images/usdt-3d.png'

interface TokenOverviewProperties extends ComponentProps<'div'> {}

export const TokenOverview = (props: TokenOverviewProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn(className, 'flex gap-8 *:w-1/2')} {...rest}>
      <div className="grid grid-cols-[repeat(2,1fr)_1.8fr] gap-2 *:h-[11.875rem] *:space-y-2 [&>div:first-child]:rounded-l-3xl [&>div:last-child]:rounded-r-3xl">
        <BaseContainer>
          <h6>USDC Apy</h6>
          <p className="text-3xl">
            {formatPercentValue('3.84', {
              maximumFractionDigits: 2,
            })}
            <span className="ml-2 align-top text-xl/[1.375rem] text-[#3883EB]">
              {formatPercentValue('0.271', {
                maximumFractionDigits: 0,
                signDisplay: 'exceptZero',
              })}
            </span>
          </p>
        </BaseContainer>
        <BaseContainer>
          <h6>USDC tvl</h6>
          <p className="text-3xl">
            {formatUsdValue('567.83', { notation: 'compact', minimumFractionDigits: 2 })}
            <span className="ml-2 align-top text-xl/[1.375rem] text-[#3883EB]">
              {formatPercentValue('0.271', {
                maximumFractionDigits: 0,
                signDisplay: 'exceptZero',
              })}
            </span>
          </p>
        </BaseContainer>
        <BaseContainer>
          <h6>Rebalancing volume</h6>
          <p className="text-3xl">
            {formatUsdValue('4586.74', { notation: 'compact', minimumFractionDigits: 2 })}
          </p>
          <Link
            to="#"
            className="group absolute bottom-[1.34rem] inline-flex items-center gap-1 text-semi-base font-bold uppercase text-main-100"
          >
            <span>Go to USDC</span>
            <Arrow className="h-fit w-4 transition group-hover:translate-x-2 [&_*]:stroke-main-100" />
          </Link>
          <img
            src={usdc}
            alt="usdc"
            className="absolute bottom-[-5.4rem] right-[-8.5rem] size-[20.8125rem] rotate-[5.207deg] opacity-20"
          />
        </BaseContainer>
      </div>
      <div className="grid grid-cols-[repeat(2,1fr)_1.8fr] gap-2 *:h-[11.875rem] *:space-y-2 [&>div:first-child]:rounded-l-3xl [&>div:last-child]:rounded-r-3xl">
        <BaseContainer>
          <h6>USDC Apy</h6>
          <p className="text-3xl">
            {formatPercentValue('3.84', {
              maximumFractionDigits: 2,
            })}
            <span className="ml-2 align-top text-xl/[1.375rem] text-[#3883EB]">
              {formatPercentValue('0.271', {
                maximumFractionDigits: 0,
                signDisplay: 'exceptZero',
              })}
            </span>
          </p>
        </BaseContainer>
        <BaseContainer>
          <h6>USDC tvl</h6>
          <p className="text-3xl">
            {formatUsdValue('567.83', { notation: 'compact', minimumFractionDigits: 2 })}
            <span className="ml-2 align-top text-xl/[1.375rem] text-[#3883EB]">
              {formatPercentValue('0.271', {
                maximumFractionDigits: 0,
                signDisplay: 'exceptZero',
              })}
            </span>
          </p>
        </BaseContainer>
        <BaseContainer>
          <h6>Rebalancing volume</h6>
          <p className="text-3xl">
            {formatUsdValue('4586.74', { notation: 'compact', minimumFractionDigits: 2 })}
          </p>
          <Link
            to="#"
            className="group absolute bottom-[1.34rem] inline-flex items-center gap-1 text-semi-base font-bold uppercase text-main-100"
          >
            <span>Go to USDC</span>
            <Arrow className="h-fit w-4 transition group-hover:translate-x-2 [&_*]:stroke-main-100" />
          </Link>
          <img
            src={usdc}
            alt="usdc"
            className="absolute bottom-[-5.4rem] right-[-8.5rem] size-[20.8125rem] rotate-[5.207deg] opacity-20"
          />
        </BaseContainer>
      </div>
    </div>
  )
}
