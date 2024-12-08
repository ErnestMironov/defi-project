import { useGetUsersPoints } from '@api/maat-finance/useGetUsersPoints'
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

interface BestBruddasProperties extends React.HTMLAttributes<HTMLDivElement> {}
export default function LeaderBoard({ className, ...rest }: BestBruddasProperties) {
  const { data } = useGetUsersPoints()
  const users = (data?.items || []) as unknown as User[]
  console.log(users)

  return (
    <div className={cn('flex flex-col gap-4 rounded-xl rounded-xl', className)} {...rest}>
      <div className="rounded-xl bg-cards-widget">
        <div className="border-b border-stroke-100 px-6">
          <div className="flex items-center gap-[0.38rem] py-3">
            <PersonIcon className="size-4" />
            <p className="text-sm leading-6 text-text-100">Best Bruddas</p>
          </div>
        </div>
        <Table className="rounded-b-xl bg-cards-widget">
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
