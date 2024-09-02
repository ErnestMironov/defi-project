import type { IncentiveEvent } from '@api/maat-finance/types'
import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { INCENTIVE_ACTION_TYPE } from '@constants/action-type'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

interface IncentiveRowProperties extends ComponentProps<'div'> {
  event: IncentiveEvent
}

export const IncentiveRow = (props: IncentiveRowProperties) => {
  const { event } = props

  return (
    <Table.Row>
      <Table.Cell>
        {INCENTIVE_ACTION_TYPE[event.action_type as keyof typeof INCENTIVE_ACTION_TYPE]}
      </Table.Cell>
      <Table.Cell className="capitalize">{event.entity_initializer}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <p className="w-[6.9rem]">{shortenString(event.hash, 5)}</p>
          <CopyButton text={event.hash} className="ml-4 size-6 shrink-0" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={event.src_chain_id} className="size-8 gap-3" />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
    </Table.Row>
  )
}
