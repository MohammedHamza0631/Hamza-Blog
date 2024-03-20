import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

function Header () {
  const { userInfo, setuserInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   fetch('https://hamza-blog-server.onrender.com/profile', {
  //     credentials: 'include',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(res => {
  //     res.json().then(userInfo => {
  //       setuserInfo(userInfo)
  //     })
  //   })
  // }, [])
  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const response = await fetch(
            'https://hamza-blog-server.onrender.com/profile',
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

  // function logout () {
  //   fetch('https://hamza-blog-server.onrender.com/logout', {
  //     credentials: 'include',
  //     method: 'POST'
  //   }).then(() => {
  //     window.location.replace('/')
  //     setuserInfo(null)
  //   })
  // }
  function logout () {
    fetch('https://hamza-blog-server.onrender.com/logout', {
      // You don't need to send back the token for logging out...
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      localStorage.removeItem('token') // Clear the token from localStorage
      setuserInfo(null)
      window.location.replace('/')
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
        MyBlog
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
