import { Button } from '@components/ui/button'
import { getRandomOkAnalog } from '@utils/phrases'
import type { ComponentProps } from 'react'

import { useTxStore } from '../store/useTxStore'

interface SuccessButtonProperties extends ComponentProps<'button'> {
  onSuccess?: () => void
  className?: string
}

/**
 * Button component that displays a random success message and triggers a success action
 */
export const SuccessButton: React.FC<SuccessButtonProperties> = ({
  onSuccess,
  className = '',
  ...props
}) => {
  const { resetStore, setCurrentModal } = useTxStore()

  const handleSuccess = () => {
    resetStore()
    setCurrentModal(null)
    onSuccess?.()
  }

  return (
    <Button type="button" onClick={handleSuccess} className={className} {...props}>
      {getRandomOkAnalog()}
    </Button>
  )
}
