export interface IDepositWizardProperties {
  successDepositHandler?: () => void
}

export type STEP_STATUS = 'idle' | 'pending' | 'success' | 'error'

export interface IDepositWizardHook {
  onSuccessHandler?: () => void
}
