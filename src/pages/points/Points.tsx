import { useCheckRegistration } from '@hooks/useCheckRegistration'
import EarningMethodCard from '@modules/referal-system/components/EarningMethodCard'
import InfoBlock from '@modules/referal-system/components/InfoBlock'
import UserInfo from '@modules/referal-system/components/UserInfo'
import { type ComponentProps } from 'react'

interface PointsProperties extends ComponentProps<'div'> {}

const EARNING_METHODS = [
  {
    title: 'Da yeeld',
    description: 'To find da clucks you need to have da yeeld',
  },
  {
    title: 'Da Godes',
    description: 'Stay loyal to da godes - da non believers will be spit on',
  },
  {
    title: 'Da Belief',
    description: 'Spit on da non believer',
  },
  {
    title: 'Da Frens',
    description: 'Help bruddas find da yeeld and find yeeld urself.',
  },
] as const

export const Points = (_props: PointsProperties) => {
  useCheckRegistration()

  return (
    <div className="flex flex-col gap-6 max-md:mt-4 max-md:gap-[0.88rem]">
      <InfoBlock className="" />
      <div className="mt-12 grid grid-cols-4 gap-4 max-md:mt-0 max-md:grid-cols-1 max-md:gap-6 max-md:rounded-3xl max-md:bg-cards-widget max-md:p-6">
        {EARNING_METHODS.map((earningMethod) => (
          <EarningMethodCard earningMethod={earningMethod} />
        ))}
      </div>

      <div className="mb-12">
        <div className="col-span-1">
          <UserInfo className="" />
        </div>
      </div>
    </div>
  )
}
