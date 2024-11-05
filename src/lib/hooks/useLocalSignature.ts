import { useLocalStorage } from './common/useLocalStorage'

const SIGNATURE_KEY = 'maat-signature'

export const useLocalSignature = () => {
  const [signature, setSignature] = useLocalStorage<string | null>(SIGNATURE_KEY, null)

  const clearSignature = () => {
    console.log('🚀 ~ Clearing signature')
    setSignature(null)
  }

  const saveSignature = (newSignature: string) => {
    console.log('🚀 ~ Saving new signature:', newSignature)
    setSignature(newSignature)
  }

  return {
    signature,
    saveSignature,
    clearSignature,
  }
}
