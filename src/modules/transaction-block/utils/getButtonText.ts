export const getButtonContent = (status: string, defaultText: string) => {
  switch (status) {
    case 'error': {
      return 'Try again'
    }
    case 'confirm_in_wallet': {
      return 'Confirm in wallet'
    }
    default: {
      return defaultText
    }
  }
}
