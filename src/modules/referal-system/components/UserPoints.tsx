import StartBold from '@assets/icons/start-bold.svg'

interface UserPointsProperties extends React.HTMLAttributes<HTMLDivElement> {
  value: number | undefined
}

export default function UserPoints({ value, ...props }: UserPointsProperties) {
  return (
    <div
      className="flex items-center justify-center gap-1 rounded-md  bg-main-15 p-1 px-2 text-sm"
      {...props}
    >
      <StartBold className="size-4" />
      <p className="text-sm font-medium text-main-100">
        {Math.floor(value ?? 0)} / <span className="text-main-80">user</span>
      </p>
    </div>
  )
}
