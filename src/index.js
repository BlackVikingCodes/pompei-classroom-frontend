import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HomeworksContextProvider } from './context/HomeworkContext'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeContextProvider } from './context/ThemeContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <HomeworksContextProvider>
          <App />
        </HomeworksContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);