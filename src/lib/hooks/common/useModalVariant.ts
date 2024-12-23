import useDeviceWidth from './useDeviceWidth'

// Determines which modal variant to use based on device width
export const useModalVariant = () => {
  const { isMobile } = useDeviceWidth()

  return {
    isDrawer: isMobile,
    isDialog: !isMobile,
  }
}
