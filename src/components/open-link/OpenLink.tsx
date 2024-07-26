import 'winbox/dist/css/winbox.min.css'
import 'winbox/dist/css/themes/modern.min.css'

import { Button } from '@components/ui/button'
import React from 'react'
import WinBox from 'winbox/src/js/winbox'

interface OpenLinkProperties {
  url: string
}

export const OpenLink: React.FC<OpenLinkProperties> = ({ url }) => {
  const openInWinBox = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
  ) => {
    event.preventDefault()
    setTimeout(() => {
      new WinBox('New Tab', {
        url,
        width: '90%',
        height: '100%',
        top: 60,
        right: 0,
        bottom: 0,
        left: 0,
        title: 'Theme: Modern',
        class: 'modern',

        onfocus() {
          this.setBackground('var(--main-100)')
        },
        onblur() {
          this.setBackground('#777')
        },
      })
    }, 100) // Задержка в 100 миллисекунд
  }

  return <Button onClick={(event) => openInWinBox(event, url)}>Open in new WinBox</Button>
}
