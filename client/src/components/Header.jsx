import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

function Header () {
  const { userInfo, setuserInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const response = await fetch(
            'https://hamza-blog-server.vercel.app/profile',
            {
              credentials: 'include',
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            }
          )
          if (!response.ok) {
            throw new Error('Failed to fetch user profile! Please login.')
          }

          const userInfo = await response.json()
          setuserInfo(userInfo)
        } catch (error) {
          setError(error) // Store the error if one occurs
        }
      }
    }

    fetchProfile()
  }, [])

  function logout () {
    fetch('https://hamza-blog-server.vercel.app/logout', {
      // You don't need to send back the token for logging out...
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      localStorage.removeItem('token') // Clear the token from localStorage
      setuserInfo(null)
      // window.location.replace('/')
      navigate('/')
    })
  }
  if (error) {
    // Example: Show an error message
    return <div className='error'>Error fetching profile: {error.message}</div>
  }
  const username = userInfo?.username
  return (
    <header>
      <Link to='/' className='logo'>
        HB
      </Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create a new post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
