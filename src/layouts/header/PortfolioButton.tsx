import { Button } from '@components/ui/button'
import React from 'react'

const OpenPortfolioButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      onClick={() => {
        onClick()
      }}
      type="button"
    >
      Open Portfolio
    </Button>
  )
}

export default OpenPortfolioButton
