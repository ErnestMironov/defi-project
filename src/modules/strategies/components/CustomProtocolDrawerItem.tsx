import Eye from '@assets/icons/eye.svg'
import EyeNo from '@assets/icons/eye-no.svg'
import Unknown from '@assets/icons/unknown.svg'
import { Select } from '@components/select/Select'
import { IconWithLabelComponent } from '@components/token-icon'
import { cn } from '@utils/cn'

interface CustomProtocolDrawerItemProperties {
  className?: string
  index: number
  symbol?: string
  chain?: string
  protocol?: string
  color?: string
  visible?: boolean
}

const UnknownIcon = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Unknown className="size-[20px] text-base" />
      <div className="text-base text-text-90">{label}</div>
    </div>
  )
}

export const CustomProtocolDrawerItem = ({
  className,
  chain,
  color,
  protocol,
  symbol,
  index,
  visible = true,
}: CustomProtocolDrawerItemProperties) => {
  return (
    <div className={cn('space-y-3 w-full', className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn('size-2.5 rounded-full', !visible && 'opacity-50')}
          style={{ backgroundColor: color || '#9998B8' }}
        />
        <div className={cn('text-base text-text-90', !visible && 'opacity-50')}>
          Line {index + 1}
        </div>
        {visible ? <Eye className="size-5" /> : <EyeNo className="size-5" />}
      </div>
      <div className="flex w-full gap-3 *:flex-1">
        <Select
          className="px-4 py-3"
          options={[]}
          disabled={!symbol}
          placeholder="Token"
          value={{
            label: symbol ? (
              <IconWithLabelComponent symbol={symbol} className="size-[20px] text-base" />
            ) : (
              <UnknownIcon label="Token" />
            ),
            value: symbol || 'Token',
          }}
          onChange={(value) => {
            console.log(value)
          }}
        />
        <Select
          className="px-4 py-3"
          disabled={!chain}
          options={[]}
          placeholder="Chain"
          value={{
            label: chain ? (
              <IconWithLabelComponent symbol={chain} className="size-[20px] text-base" />
            ) : (
              <UnknownIcon label="Chain" />
            ),
            value: chain || 'Chain',
          }}
          onChange={(value) => {
            console.log(value)
          }}
        />
        <Select
          className="px-4 py-3"
          options={[]}
          disabled={!protocol}
          placeholder="Protocol"
          value={{
            label: protocol ? (
              <IconWithLabelComponent
                symbol={protocol}
                className="size-[20px] text-base"
              />
            ) : (
              <UnknownIcon label="Protocol" />
            ),
            value: protocol || 'Protocol',
          }}
          onChange={(value) => {
            console.log(value)
          }}
        />
      </div>
    </div>
  )
}
