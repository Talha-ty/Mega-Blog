import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import './index.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

// Layout component WITH Header (for main app pages)
function LayoutWithHeader() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// Layout component WITHOUT Header (for auth pages - signup/login)
function LayoutWithoutHeader() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
  });

  return !loading ? (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  ) : null
}

// Export both layout components along with App
export { LayoutWithHeader, LayoutWithoutHeader }
export default App