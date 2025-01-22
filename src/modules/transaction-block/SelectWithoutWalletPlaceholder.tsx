import { ShadowBox } from '@components/box/ShadowBox'
import { useAppKit } from '@reown/appkit/react'

export const SelectWithoutWalletPlaceholder = () => {
  const { open: openConnectModal } = useAppKit()

  return (
    <ShadowBox
      className="cursor-pointer rounded-[62.4375rem] px-6 py-5 transition-shadow hover:bg-[#8585A914] max-lg:gap-1 max-lg:px-5 max-lg:py-4"
      onClick={() => openConnectModal()}
    >
      <span>Connect</span>
    </ShadowBox>
  )
}
