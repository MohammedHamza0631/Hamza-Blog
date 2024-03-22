import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setuserInfo } = useContext(UserContext)
  const cursorRef = useRef()
  const [error, setError] = useState(null)

  useEffect(() => {
    cursorRef.current.focus()
  }, [])

  async function login (e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json() // Try to get error data
        throw new Error(errorData.error || 'Unknown error. Please try again.')
      }

      const userInfo = await response.json()
      setuserInfo(userInfo)
      localStorage.setItem('token', userInfo.token)
      toast.success('You are now Logged in!', {
        style: {
          background: '#333',
          color: '#fff'
        }
      })
      setRedirect(true)
    } catch (error) {
      setError(error)
      toast.error(error.message, {
        style: {
          background: '#fdd',
          color: '#d00'
        }
      })
      
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>

      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        ref={cursorRef}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginPage
