import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import blogService from './services/blogs' // eslint-disable-line no-unused-vars
import Notification from './components/Notification' // eslint-disable-line no-unused-vars
import ErrorMessage from './components/ErrorMessage' // eslint-disable-line no-unused-vars
import Blogs from './components/Blogs' // eslint-disable-line no-unused-vars
import loginService from './services/login' // eslint-disable-line no-unused-vars
import LoginForm from './components/LoginForm' // eslint-disable-line no-unused-vars
import BlogForm from './components/BlogForm' // eslint-disable-line no-unused-vars
import Togglable from './components/Togglable' // eslint-disable-line no-unused-vars


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState(
    ''
  )
  const [newAuthor, setNewAuthor] = useState(
    ''
  )
  const [newUrl, setNewUrl] = useState(
    ''
  )
  const blogFormRef = React.createRef()

  // Get blogs from db
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // Check if log info saved in local storage
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // Add a blog, change response's user to match blogs state
  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const changedReturnedBlog = {
          ...returnedBlog, user: {
            id: returnedBlog.user,
            username: user.username,
            name: user.name }
        }
        setBlogs(blogs.concat(changedReturnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setMessage(
          `'${returnedBlog.title}' was added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        // Server returns an error message
        console.log(error.response.data)
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          console.log('Error: ', error)
          setErrorMessage(null)
        }, 5000)
      })
  }

  // Update blog likes, change response's user to match blogs state
  const updateBlogLikes = (searchId) => {
    const blogToUpdate = blogs.find(({ id }) => id === searchId)
    const newLikes = blogToUpdate.likes + 1
    const changedBlog = { ...blogToUpdate, likes: newLikes }

    blogService
      .update(blogToUpdate.id, changedBlog)
      .then(response => {
        const changedResponse = {
          ...response, user: {
            id: blogToUpdate.user.id,
            username: blogToUpdate.user.username,
            name: blogToUpdate.user.name }
        }
        setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : changedResponse))
      })
      .catch(error => {
        setBlogs(blogs.filter(p => p.id !== blogToUpdate.id))
        console.log('error', error)
      })
  }

  // Deleting the blog
  const deleteBlog = (id, title, author) => {
  // console.log('Attr', id, name)
    if (window.confirm(`Do you really want to delete blog ${title}? by ${author}`)) {
      blogService
        .deleteThis(id)
        .then(returnedData => {
          console.log('Delete status response', returnedData)
        })
        .catch(error => {
          alert(`the blog '${title}' was already deleted from server`)
          console.log('error', error)
        })
      let copy = blogs.filter(blog => blog.id !== id)
      setBlogs(copy)
      setMessage(
        `Blog '${title}' was removed`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // Conditional rendering
  if (user === null) {
    return (
      <div>

        <h2>Log in to application</h2>

        <Notification
          message={message}
        />
        <ErrorMessage
          errorMessage={errorMessage}
        />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        message={message}
      />
      <ErrorMessage
        errorMessage={errorMessage}
      />

      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Togglable buttonLabel="New blog note" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          setNewTitle={setNewTitle}
          setNewAuthor={setNewAuthor}
          setNewUrl={setNewUrl}
        />
      </Togglable>

      <Blogs
        blogs={blogs}
        updateBlogLikes={updateBlogLikes}
        deleteBlog={deleteBlog}
        user={user}
      />

    </div>
  )
}

export default App
