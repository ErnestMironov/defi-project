import { useState } from 'react'

type BarButton = 'open' | 'close' | 'back'
type Content = 'menu' | 'portfolio'

export const useSidebarState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentContent, setCurrentContent] = useState<Content>('menu')
  const [currentBarButton, setCurrentBarButton] = useState<BarButton>('open')

  const handlePortfolioOpen = () => {
    setCurrentContent('portfolio')
    setCurrentBarButton('back')
  }

  const handlePortfolioClose = () => {
    setCurrentContent('menu')
    setCurrentBarButton('close')
  }

  const handleOpen = () => {
    setIsOpen(true)
    setCurrentBarButton('close')
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentBarButton('open')
    setCurrentContent('menu')
  }

  return {
    isOpen,
    currentContent,
    currentBarButton,
    handlePortfolioOpen,
    handlePortfolioClose,
    handleOpen,
    handleClose,
  }
}
