import { cn } from '@utils/cn'
import React from 'react'

interface Grey3DBoxProperties extends React.HTMLProps<HTMLDivElement> {
  // Add any additional props you need for the Grey3DBox component
}

const Grey3DBox: React.FC<Grey3DBoxProperties> = (props) => {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-between self-stretch rounded-bl-2xl rounded-br-2xl bg-cards-widget p-6 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] border-t border-stroke-40100',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}

export default Grey3DBox
