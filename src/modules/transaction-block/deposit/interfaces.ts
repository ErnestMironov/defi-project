export interface IDepositWizardProperties {
  _allStepsCompleted?: boolean
}

export type STEP_STATUS = 'idle' | 'pending' | 'success' | 'error' | 'confirm_in_wallet'

export interface IDepositWizardHook {
  onSuccessHandler?: () => void
}
