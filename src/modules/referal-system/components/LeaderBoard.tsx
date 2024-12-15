import { useGetUsersPoints } from '@api/maat-finance/useGetUsersPoints'
import MoreOptions from '@assets/icons/more-options.svg'
import PersonIcon from '@assets/icons/person-icon.svg'
import StartBold from '@assets/icons/start-bold.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'

interface User {
  badge: {
    level: number
  }
  info: {
    userId: `0x${string}`
    totalPoints: number
  }
}

interface LeaderBoardProperties extends React.HTMLAttributes<HTMLDivElement> {}
export default function LeaderBoard({ className, ...rest }: LeaderBoardProperties) {
  const { data } = useGetUsersPoints()
  const users = (data?.items || []) as unknown as User[]

  return (
    <div
      className={cn('flex flex-col gap-4 rounded-xl shadow-test-2', className)}
      {...rest}
    >
      <div className="rounded-xl bg-cards-widget">
        <div className="border-b border-stroke-100 px-6">
          <div className="flex items-center gap-[0.38rem] py-3">
            <PersonIcon className="size-4" />
            <p className="text-sm leading-6 text-text-100">Best Bruddas</p>
          </div>
        </div>

        <div className="md:hidden">
          {users.length === 0 ? (
            <div className="text-text-200 p-4 text-center">No users found</div>
          ) : (
            users.map((user: User) => (
              <div
                key={user.info.userId}
                className="my-1 gap-1 border-stroke-100 px-1 last:border-b-0"
              >
                <div className="flex w-full flex-col rounded-lg border  border-stroke-100 ">
                  <div className="flex w-full items-center justify-between border-b border-stroke-100 px-4 py-2">
                    <p className="text-sm text-text-2100">Address</p>
                    <div className="flex items-center gap-1 text-sm">
                      {shortenAddress(user.info.userId)}
                      <MoreOptions className="size-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 ">
                    <div className="flex items-center justify-between border-r border-stroke-100 px-4 py-2 text-sm text-text-2100">
                      <p>LVL</p>
                      <p className="text-text-1100">{user.badge.level}</p>
                    </div>
                    <div className="flex items-center gap-[0.38rem] px-4 py-2 text-main-100">
                      <StartBold className="size-5" />
                      {Math.floor(user.info.totalPoints)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Table className="hidden rounded-b-xl bg-cards-widget md:table">
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className="">#</Table.HeadCell>
              <Table.HeadCell className="py-5 pl-4 pr-3">Address</Table.HeadCell>
              <Table.HeadCell>LVL</Table.HeadCell>
              <Table.HeadCell>Collected</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {users.length === 0 ? (
              <Table.EmptyState>No users found</Table.EmptyState>
            ) : (
              users.map((user: User, index: number) => (
                <Table.Row key={user.info.userId}>
                  <Table.Cell className="w-[3.75rem] text-sm text-text-2100">
                    #{index + 1}
                  </Table.Cell>
                  <Table.Cell className="flex items-center gap-[0.38rem]">
                    {shortenAddress(user.info.userId)}
                    <CopyButton text={user.info.userId} />
                  </Table.Cell>
                  <Table.Cell>{user.badge.level}</Table.Cell>
                  <Table.Cell className="flex items-start gap-[0.38rem] text-main-100">
                    <StartBold className="size-5" />
                    {Math.floor(user.info.totalPoints)}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
