import LinkArrow from '@assets/icons/link-arrow.svg'
import { cn } from '@utils/cn'

interface IDocument {
  text: string
  link: string
  linkName: string
}

const documentation: IDocument[] = [
  {
    text: 'GitHub Check our Github to explore MAAT’s infrastructure',
    link: 'https://github.com/MAAT-Finance',
    linkName: 'GitHub',
  },
  {
    text: 'Documentation Stay abreast of updates by engaging with docs',
    link: 'https://maat.io/docs/maat-rebalances-you-earn',
    linkName: 'Documentation',
  },
]

const DocumentCard = ({ link, linkName, text }: IDocument) => {
  return (
    <div className="group flex snap-center flex-col items-start justify-between gap-[1.38rem] self-stretch rounded-[1.75rem] bg-cards px-8 py-6 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] max-lg:min-w-[90vw] max-lg:gap-4">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-xl bg-green-15 px-4 py-2.5 font-[Arial] text-[0.9375rem] font-bold uppercase not-italic text-[#79DEC2] max-lg:px-3  max-lg:py-2 max-lg:text-[0.75rem]"
      >
        {linkName}
        <LinkArrow className="overflow-visible duration-300 group-hover:translate-x-2 max-lg:h-4 max-lg:w-3" />
      </a>
      <p className="text-[1.375rem] font-normal uppercase leading-[120%] max-lg:text-base">
        {text}
      </p>
    </div>
  )
}

export const DocumentationLinks: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <div
      {...props}
      className={cn(
        'flex max-lg:flex-col gap-[5.5rem] max-lg:gap-6 items-start justify-between',
        props.className,
      )}
    >
      <h2 className="flex-2 w-[39rem] text-[4rem] font-normal uppercase not-italic leading-[100%] max-lg:w-screen max-lg:px-4 max-lg:text-[2.125rem]">
        maat rebalances you earn
      </h2>
      <div className="hide-scrollbar flex w-full flex-1 gap-2 max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:px-4 max-lg:pb-[0.38rem] lg:gap-4">
        {documentation.map((document) => (
          <DocumentCard key={document.text} {...document} />
        ))}
      </div>
    </div>
  )
}
