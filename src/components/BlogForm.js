import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
      Title:
        <input
          {...newTitle}
        />
      </div>
      <div>
      Author:
        <input
          {...newAuthor}
        />
      </div>
      <div>
      Url:
        <input
          {...newUrl}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.object.isRequired,
  newAuthor: PropTypes.object.isRequired,
  newUrl: PropTypes.object.isRequired
}

export default BlogForm