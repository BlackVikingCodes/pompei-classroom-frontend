import { HomeworksContext } from '../context/HomeworkContext'
import { useContext } from 'react'

export const useHomeworksContext = () => {
  const context = useContext(HomeworksContext)

  if (!context) {
    throw Error('useHomeworksContext must be used inside an HomeworksContextProvider')
  }

  return context
}