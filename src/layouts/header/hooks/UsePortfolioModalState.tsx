import { useState } from 'react'

export const usePortfolioModalState = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handlePortfolioOpen = () => {
    console.log('open123')
    setIsOpen(!isOpen)
  }

  const handlePortfolioClose = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    handlePortfolioOpen,
    handlePortfolioClose,
  }
}
