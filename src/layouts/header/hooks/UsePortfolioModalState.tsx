import { useState } from 'react'

export const usePortfolioModalState = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handlePortfolioOpen = () => {
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
