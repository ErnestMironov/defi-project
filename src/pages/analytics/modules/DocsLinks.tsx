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
    link: 'https://maat.io/docs/maat-rebalances-you-earn',
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
    <div className="flex flex-col items-start justify-between gap-[1.38rem] self-stretch rounded-[1.75rem] bg-[#FFF] px-8 py-6 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)]">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-xl bg-green-15 px-4 py-2.5 font-[Arial] text-[0.9375rem] font-bold uppercase not-italic leading-[120%] text-[#79DEC2]"
      >
        {linkName}
        <LinkArrow />
      </a>
      <p className="text-[1.375rem] font-normal uppercase leading-[120%]">{text}</p>
    </div>
  )
}

export const DocumentationLinks: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <div
      {...props}
      className={cn('flex gap-[5.5rem] items-center justify-between', props.className)}
    >
      <h2 className="flex-2 w-[39rem] text-[4rem] font-normal uppercase not-italic leading-[100%]">
        maat rebalances you earn
      </h2>
      <div className="flex flex-1 gap-4">
        {documentation.map((document) => (
          <DocumentCard key={document.text} {...document} />
        ))}
      </div>
    </div>
  )
}
