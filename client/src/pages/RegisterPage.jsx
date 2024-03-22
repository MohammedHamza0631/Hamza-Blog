import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom' // Import Navigate
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cursorRef = useRef()
  const [error, setError] = useState(null)
  const { setuserInfo } = useContext(UserContext) // Get the setuserInfo function
  const [redirect, setRedirect] = useState(false) // Add redirect state

  useEffect(() => {
    cursorRef.current.focus()
  }, [])
  async function register (e) {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://hamza-blog-server.onrender.com/register',
        {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration Failed')
      } else {
        const userInfo = await response.json()
        setuserInfo(userInfo)
        localStorage.setItem('token', userInfo.token) // Store token
        toast.success('You are now Logged in!', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        setRedirect(true) // Set redirect to true
      }
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
    return <Navigate to='/' />
  }
  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>

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
      <button type='submit'>Register</button>
    </form>
  )
}

export default RegisterPage
