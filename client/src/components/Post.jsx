import React from 'react'
import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'
function Post ({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className='posts'>
      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img
            src={'https://hamza-blog-server.onrender.com/' + cover}
            alt='postImage'
          />
        </Link>
      </div>

      <div className='text'>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a href='/' className='author'>
            {' '}
            -by @{author.username}
          </a>
          {/* <time>{format(createdAt, 'MMM, d, yyyy')}</time> */}
          <time>{formatISO9075(createdAt)}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  )
}

export default Post
