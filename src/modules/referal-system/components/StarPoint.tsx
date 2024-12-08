import StartBold from '@assets/icons/start-bold.svg'

interface StarPointProperties extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export default function StarPoint({ value, ...props }: StarPointProperties) {
  return (
    <div
      className="flex items-center justify-center gap-1 rounded-md  bg-main-15 p-1 px-2 text-sm"
      {...props}
    >
      <p className="text-sm font-medium text-main-100">+</p>
      <StartBold className="size-4" />
      <p className="text-sm font-medium text-main-100">{value}</p>
    </div>
  )
}
