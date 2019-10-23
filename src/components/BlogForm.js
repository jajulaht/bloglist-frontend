import React from 'react'

const BlogForm = ({ addBlog, newTitle, newAuthor, newUrl, setNewTitle, setNewAuthor, setNewUrl }) => {
  return (
      <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
        Title:
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
      </div>
      <div>
        Author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
      </div>
      <div>
        Url:
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm