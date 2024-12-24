import Logo from '@assets/icons/menu/logo.svg'
import { ChevronsUpDown } from 'lucide-react'

export const MenuTrigger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 pr-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Logo className="w-16" />
      {!isOpen && (
        <ChevronsUpDown className="size-4 text-[#30303066] dark:text-[#8585A9]" />
      )}
    </button>
  )
}
