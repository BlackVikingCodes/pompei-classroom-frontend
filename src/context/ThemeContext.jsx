import { createContext, useState } from "react";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev==='light' ? 'dark' : 'light')
  }

  const themeContextValue = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      { children }
    </ThemeContext.Provider>
  )
}