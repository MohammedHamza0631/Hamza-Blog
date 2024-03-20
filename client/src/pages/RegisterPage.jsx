import React, { useState, useEffect, useRef } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cursorRef = useRef()
  const [error, setError] = useState(null)

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
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration Failed')
      }

      // Successful registration (Modify this as needed)
      setError(null) // Reset the error
      alert('Registration Successful')
      setUsername('') // Clear username field
      setPassword('') // Clear password field
    } catch (error) {
      setError(error)
    }
  }
  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      {error && <div className='error'>{error.message}</div>}
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
