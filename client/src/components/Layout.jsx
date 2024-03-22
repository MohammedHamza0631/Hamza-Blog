import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Toaster />
    </main>
  )
}

export default Layout
