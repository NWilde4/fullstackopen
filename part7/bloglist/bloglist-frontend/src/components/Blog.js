import React, { useState } from 'react'
import blogService from '../services/blogs'
import { addLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, currentUser, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  //const [currentLikes, setCurrentLikes] = useState(blog.likes)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const likeBlog = event => {
    event.preventDefault()

    const likedBlog = {
      user: blog.user.id, //I NEEDED TO ADD ONLY THE ID NOT THE WHOLE USER OBJECT
      likes:  blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(blog.id, likedBlog)
      .then(blog => dispatch(addLike(blog)))
      .catch(error => console.log(error))
  }

  const removeBlog = event => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='blogWithoutDetails' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='blogWithDetails' style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button onClick={likeBlog}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {currentUser.name === blog.user.name &&
          <button onClick={removeBlog}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog