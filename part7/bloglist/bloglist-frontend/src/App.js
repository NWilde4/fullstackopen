import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import {
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@material-ui/core'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  
  const dispatch = useDispatch()
  
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
    usersService.getAll().then(users => setUsers(users))
  }, [])

  const blogs = useSelector(state => state.blogs)

  const userMatch = useRouteMatch('/users/:id')
  const userParam = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogParam = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(createBlog(returnedBlog))
        dispatch(setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        ))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = blogObject => {
    event.preventDefault()
    const message = `Remove blog ${blogObject.title} by ${blogObject.author}`
    if (window.confirm(message)) {
      blogService
        .remove(blogObject.id)
        .catch(error => console.log(error))
      dispatch(removeBlog(blogObject))
    }
  }

  const byLikes = (a1, a2) => a2.likes - a1.likes

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <Container>
      <NavBar
        username={user.name}
        handleLogout={handleLogout}
      />
      <Notification notification={notification} />

      <Switch>
        <Route path='/users/:id'>
          <User user={userParam} />
        </Route>

        <Route path='/users'>
          <h2>Users</h2>
          <Users users={users} />
        </Route>

        <Route path='/blogs/:id'>
          <BlogDetails 
            blog={blogParam}
            currentUser={user}
            deleteBlog={deleteBlog}
          />
        </Route>

        <Route path='/'>
          <h2>blog app</h2>
          <Togglable buttonLabel="create new" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs
                  .sort(byLikes)
                  .map(blog =>
                    <TableRow key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>
                        <TableCell>
                         {blog.title}
                        </TableCell>
                      </Link>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Route>

      </Switch>
    </Container>
  )
}

export default App