import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
  if (blogs.length == null) {
    return <div>Loading...</div>
  }
  else {
    // Map blogs array data to rows
    const rows = () => blogs.map(blog =>
      <React.Fragment key={blog.id}>
      <Blog
        title={blog.title} 
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
      /><br />
      </React.Fragment>
    )
    return (
      <div>
        {rows()}
      </div>
    )
  }
}

export default Blogs