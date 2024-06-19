import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { ShadowBoxWithValue } from '@components/box/ShadowBoxWithValue'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
import type { ComponentProps } from 'react'

interface DepositProperties extends ComponentProps<'div'> {}

export const Deposit = (_props: DepositProperties) => {
  return (
    <div className="pointer-events-none  flex w-full justify-center">
      <div className="pointer-events-auto mt-10 flex w-[38.75rem] flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          <ShadowBoxWithValue label="USDС APY" value="721%">
            <img src={usdc} alt="usdc" className="absolute right-0 top-0 size-32" />
          </ShadowBoxWithValue>
          <ShadowBoxWithValue label="USDT APY" value="581%">
            <img src={usdt} alt="usdt" className="absolute right-0 top-0 size-32" />
          </ShadowBoxWithValue>
        </div>
        <TransactionBlock />
      </div>
    </div>
  )
}
