import { createContext, useReducer } from 'react'

export const HomeworksContext = createContext()

export const homeworksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOMEWORKS': 
      return {
        homeworks: action.payload
      }
    case 'CREATE_HOMEWORK':
      return {
        homeworks: [action.payload, ...state.homeworks]
      }
    case 'DELETE_HOMEWORK':
      return {
        homeworks: state.homeworks.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const HomeworksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homeworksReducer, {
    homeworks: null
  })

  return (
    <HomeworksContext.Provider value={{...state, dispatch}}>
      { children }
    </HomeworksContext.Provider>
  )
}