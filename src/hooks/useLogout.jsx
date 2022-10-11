import { useAuthContext } from './useAuthContext'
import { useHomeworksContext } from './useHomeworksContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchHomeworks } = useHomeworksContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchHomeworks({ type: 'SET_HOMEWORKS', payload: null })
  }

  return { logout }
}