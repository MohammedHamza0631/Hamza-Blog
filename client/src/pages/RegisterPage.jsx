import React, { useState, useEffect, useRef } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cursorRef = useRef()

  useEffect(() => {
    cursorRef.current.focus()
  }, [])
  async function register (e) {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    if (response.status === 200) {
      alert('registration successful')
    } else {
      alert('registration failed')
    }
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
