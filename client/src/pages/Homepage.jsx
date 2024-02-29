import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
const Homepage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('/post').then(res => {
      res.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])
  return <>{posts.length > 0 && posts.map(post => <Post {...post} />)}</>
}

export default Homepage
