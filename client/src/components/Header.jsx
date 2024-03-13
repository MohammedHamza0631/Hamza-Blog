import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

function Header () {
  const { userInfo, setuserInfo } = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setuserInfo(userInfo)
      })
    })
  }, [])

  function logout () {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      window.location.replace('/')
      setuserInfo(null)
    })
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
