import { useGetUsersPoints } from '@api/maat-finance/useGetUsersPoints'
import PointIcon from '@assets/icons/point-icon.svg'
import Mackls from '@assets/images/points-mackls.jpg'
import { shortenAddress } from '@utils/transform'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import { type ComponentProps, useState } from 'react'

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
] as const

export const Points = (_props: PointsProperties) => {
  const { data } = useGetUsersPoints()

  const filteredData = data?.items.filter(({ totalRewards }) => totalRewards > 0)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-8 lg:py-[7.81rem]">
      <div className="flex grid-cols-[21.7rem_43.75rem_21.7rem] flex-col items-start justify-center gap-4 lg:grid">
        <div />
        <div>
          <div className="rounded-3xl bg-white dark:bg-cards">
            <div className="rounded-b-none rounded-t-3xl border-b border-b-stroke-element px-6 py-8 dark:border-b-stroke-100">
              <h2 className="text-[1.5rem] leading-[120%] lg:text-[2rem]">
                What are Clucks?
              </h2>
              <p className="mt-6 leading-[120%] lg:text-[1.25rem]">
                Clucks are special points issued to users who actively participate in the
                MAAT Protocol. They represent your engagement level and can unlock various
                benefits within the platform.
              </p>
            </div>
            <div className="px-6 py-8">
              <h2 className="text-[1.5rem] leading-[120%] lg:text-[2rem]">
                How to earn Clucks?
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                {EARNING_METHODS.map(({ title, description }) => (
                  <div key={title} className="flex flex-col gap-3">
                    <h3 className="text-[1.25rem] leading-[120%] lg:text-[1.5rem]">
                      {title}
                    </h3>
                    <p className="leading-[120%] text-text-50 lg:text-[1.125rem]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-3xl bg-white px-6 dark:bg-cards">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center justify-between py-8"
            >
              <h2 className="select-none text-[1.5rem] leading-[120%] lg:text-[2rem]">
                Best Bruddas
              </h2>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronDownIcon className="size-6" />
              </motion.div>
            </div>
            <motion.ul
              className="flex h-0 flex-col gap-6 overflow-hidden"
              initial={{ height: 0, paddingBottom: 0 }}
              animate={{
                height: isOpen ? 'auto' : 0,
                paddingBottom: isOpen ? '2rem' : 0,
              }}
              exit={{ height: 0, paddingBottom: 0 }}
              transition={{ duration: 0.15 }}
            >
              {filteredData?.map(({ address, totalRewards }, index) => (
                <li key={address} className="flex items-center justify-between">
                  <p className="flex items-center">
                    <span className="w-8">{index + 1}.</span>
                    {shortenAddress(address)}
                  </p>
                  <div className="flex items-center gap-2">
                    {Math.trunc(totalRewards)}
                    <PointIcon className="relative -top-0.5 size-6" />
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-3xl bg-[#FFF] px-6 py-8 dark:bg-cards">
          <h2 className="text-[1.5rem] leading-[120%] lg:text-[2rem]">Special Quests</h2>
          <img src={Mackls} alt="mackls" className="w-full" />
          <p className="text-text-100 opacity-40">Stay updated, MAAT is cooking</p>
        </div>
      </div>
    </div>
  )
}
