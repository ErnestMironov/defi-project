import TermsIcon from '@assets/icons/terms.svg'
import { cn } from '@utils/cn'

import QuestMuckles from '../assets/quests-macls.svg'

interface SpecialQuestsProperties extends React.HTMLAttributes<HTMLDivElement> {}

export const SpecialQuests = ({ className, ...rest }: SpecialQuestsProperties) => {
  return (
    <div
      className={cn(
        'w-full bg-cards-widget rounded-[1.5rem] border shadow-test-2 border-stroke-100 font-aeonik text-text',
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
        <p className={cn('text-sm text-text')}>Special quests</p>
      </div>

      <div className="flex flex-col items-center px-4 py-8">
        {/* {quests.map((quest) => (
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
        ))} */}
        <QuestMuckles className="mb-4 size-[12.75rem]" />
        <p className="text-[1.125rem] text-text-2100">MAAT is cooking, stay updated.</p>
      </div>
    </div>
  )
}
