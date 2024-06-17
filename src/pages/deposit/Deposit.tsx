import type { ComponentProps } from 'react'

interface DepositProperties extends ComponentProps<'div'> {}

export const Deposit = (_props: DepositProperties) => {
  return <div>Deposit</div>
}
