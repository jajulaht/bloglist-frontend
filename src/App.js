import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Blogs from './components/Blogs'
import loginService from './services/login' 
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


function App() {
  const [blogs, setBlogs] = useState([]) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage ] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle ] = useState(
    ''
  )
  const [newAuthor, setNewAuthor ] = useState(
    ''
  )
  const [newUrl, setNewUrl ] = useState(
    ''
  )

  // Get blogs from db
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // Check if log info saved in local storage
  useEffect(() => {
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // Add a blog
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
    .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
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
  
  // Conditional rendering
  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <ErrorMessage errorMessage={errorMessage} />

        <h2>Log in to application</h2>

        <LoginForm  handleLogin={handleLogin}
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
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <BlogForm addBlog={addBlog}
                newTitle={newTitle}
                newAuthor={newAuthor}
                newUrl={newUrl}
                setNewTitle={setNewTitle}
                setNewAuthor={setNewAuthor}
                setNewUrl={setNewUrl}
      />
      
      <Blogs    blogs={blogs}
      />

    </div>
  )


}

export default App;
