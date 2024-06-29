import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

type CopiedValue = string | null

type CopyFunction = (text: string) => Promise<boolean>

export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFunction = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast.success('Copied!')
        console.log('addScaleCorrector')
      })
      .catch(() => {
        toast.error('Failed to copy.')
      })
  }

  return { copiedText, copy, handleCopy }
}
