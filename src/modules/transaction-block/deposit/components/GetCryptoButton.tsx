import PlusIcon from '@assets/icons/plus.svg'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'

interface GetCryptoButtonProperties {
  className?: string
}

export const GetCryptoButton = ({ className }: GetCryptoButtonProperties) => {
  return (
    <Button
      size="lg"
      className={cn(
        'flex h-[4.5rem] w-full items-center justify-center gap-[0.38rem] rounded-none bg-text-5 text-base hover:bg-text-5 cursor-no-drop max-md:h-auto max-md:text-[0.9375rem] opacity-50 border-t border-stroke-100',
        className,
      )}
    >
      <PlusIcon className="size-4 [&_path]:stroke-main-100" />
      <p> Get Crypto</p>
    </Button>
  )
}
