import React, { useState } from 'react' // eslint-disable-line no-unused-vars

const Blog = ({ title, author, url, likes, name, updateBlogLikes, id, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogTitleStyle = {
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    backgroundColor: '#d6d6d6',
    marginTop: 6,
    cursor: 'pointer'
  }
  const blogStyle = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    backgroundColor: '#f0f0f0',
    marginBottom: 0
  }

  return (
    <div>
      <div style={blogTitleStyle} onClick={() => setVisible(!visible)}>{title} {author}</div>
      <div style={blogStyle}>{url}<br />
        {likes} likes <button onClick={() => updateBlogLikes(id)}>Like</button><br />
        added by {name}<br />
        <button onClick={() => deleteBlog(id, title, author)}>Remove</button>
      </div>
    </div>
  )
}

export default Blog