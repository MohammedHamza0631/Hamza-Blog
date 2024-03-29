import React, { useState, useRef, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Editor from '../components/Editor'
import toast from 'react-hot-toast'

function CreatePost () {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)
  const cursorRef = useRef()

  useEffect(() => {
    cursorRef.current.focus()
  }, [])

  async function handleSubmit (e) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])

    const response = await fetch(
      'https://hamza-blog-server.onrender.com/post',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: data,
        credentials: 'include'
      }
    )
    if (response.ok) {
      setRedirect(true)
    }

    toast.promise(response.json(), {
      loading: 'Creating post...',
      success: 'Post created successfully!',
      error: 'Error creating post. Please try again.'
    })
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Create your Post Here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='title'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={cursorRef}
        />
        <input
          type='summary'
          placeholder='Summary'
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <input type='file' onChange={e => setFiles(e.target.files)} required />
        <Editor value={content} onChange={setContent} />
        <button type='submit' style={{ marginTop: '10px' }}>
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
