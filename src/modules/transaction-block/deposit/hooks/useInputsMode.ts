import { useLocalStorage } from '@hooks/common/useLocalStorage'

const INPUT_MODE_KEY = 'deposit_inputs_mode'

export const useInputsMode = () => {
  const [isSwapped, setIsSwapped] = useLocalStorage(INPUT_MODE_KEY, false)

  return {
    isSwapped,
    setIsSwapped,
  }
}
