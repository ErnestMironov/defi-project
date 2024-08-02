export interface IDepositWizardProperties {
  successDepositHandler?: () => void
}

export type STEP_STATUS = 'idle' | 'pending' | 'success' | 'error' | 'confirm_in_wallet'

export interface IDepositWizardHook {
  onSuccessHandler?: () => void
}
