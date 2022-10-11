import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if(!context) {
    throw Error('useHomeworksContext must be used inside an HomeworksContextProvider')
  }

  return context
}