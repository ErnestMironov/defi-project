import { useNavigate } from 'react-router-dom'

// Custom hook for handling navigation in modal context
export const useModalNavigation = () => {
  let navigate

  try {
    navigate = useNavigate()
  } catch {
    // If we're outside Router context, return a noop function
    return () => {
      console.warn('Navigation attempted outside Router context')
    }
  }

  return navigate
}
