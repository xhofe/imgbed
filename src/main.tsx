// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <Toaster
        containerStyle={{
          zIndex: 99999,
        }}
        containerClassName="toaster"
      />
    </NextUIProvider>
  </React.StrictMode>,
)
