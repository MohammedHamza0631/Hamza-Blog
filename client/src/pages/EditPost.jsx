import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import toast from 'react-hot-toast'

function EditPost () {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetch('https://hamza-blog-server.onrender.com/post/' + id).then(
      response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title)
          setContent(postInfo.content)
          setSummary(postInfo.summary)
        })
      }
    )
  }, [id])

  async function updatePost (e) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)
    if (files?.[0]) {
      data.set('file', files?.[0])
    }
    await fetch('https://hamza-blog-server.onrender.com/post', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: data,
      credentials: 'include'
    })
    setRedirect(true)
    toast.promise(
      fetch('https://hamza-blog-server.onrender.com/post/' + id).then(
        response => response.json()
      ),
      {
        loading: 'Updating post...',
        success: 'Post updated successfully!',
        error: 'Error updating post. Please try again.'
      }
    )
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Edit your Post here</h2>
      <form onSubmit={updatePost}>
        <input
          type='title'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type='summary'
          placeholder='Summary'
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <input type='file' onChange={e => setFiles(e.target.files)} required />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: '10px' }}>Update Post</button>
      </form>
    </div>
  )
}

export default EditPost
