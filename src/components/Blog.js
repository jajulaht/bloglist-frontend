import React, { useState } from 'react' // eslint-disable-line no-unused-vars

const Blog = ({ title, author, url, likes, username }) => {
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
        {likes} likes <button>Like</button><br />
        added by {username}
      </div>
    </div>
  )
}

export default Blog