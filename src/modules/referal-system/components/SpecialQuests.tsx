import TermsIcon from '@assets/icons/terms.svg'
import TimerIcon from '@assets/icons/timer-icon.svg'
import { cn } from '@utils/cn'

import QuestIcon from '../assets/quests.svg'

interface SpecialQuestsProperties extends React.HTMLAttributes<HTMLDivElement> {}

export const SpecialQuests = ({ className, ...rest }: SpecialQuestsProperties) => {
  const quests = [
    {
      title: 'Take Da AKSHON',
      description: 'Deposit 100$+ in USDT and receive 1,000 Stars',
      icon: QuestIcon,
      time: '1d · 15h · 54m',
      status: 'active',
    },
  ]

  return (
    <div
      className={cn(
        'w-full bg-cards-widget rounded-xl border border-stroke-100 font-aeonik text-text-100',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex flex-row items-center border-b border-stroke-100 px-6 py-3 gap-[0.38rem]',
        )}
      >
        <TermsIcon className="size-4" />
        <p className={cn('text-sm text-text-100')}>Special quests</p>
      </div>

      <div className="flex flex-col">
        {quests.map((quest) => (
          <div className="flex items-center gap-4  px-4 py-3">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <quest.icon className="size-[5.8125rem] object-cover" />
                <div className="w-40">
                  <p className="text-base font-medium text-text-100">{quest.title}</p>
                  <p className="text-text-secondary mt-1 text-sm text-text-2100">
                    {quest.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-lg bg-cards-widget px-3 py-1.5">
                <TimerIcon className="size-4" />
                <span className="text-text-secondary text-sm">{quest.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
