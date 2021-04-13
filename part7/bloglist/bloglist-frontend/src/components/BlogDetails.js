import React from 'react'
import blogService from '../services/blogs'
import { addLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import {
  Card,
  CardContent,
  Button
} from '@material-ui/core'

const BlogDetails = ({ blog }) => {

  const dispatch = useDispatch()

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


  if (!blog) {
    return null
  }

  return (
    <div>
      <Card>
        <CardContent>
          <h2>{blog.title}</h2>
          {blog.url}
          <br/>
          {blog.likes} likes
          <Button 
            onClick={likeBlog}
            variant="contained"
          >
          like
          </Button>
          <br/>
          added by {blog.author}
        </CardContent>
      </Card>
      <h3>comments</h3>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetails