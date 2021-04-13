import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import {
  TextField,
  Button
} from '@material-ui/core'

const Comments = ({ blog }) => {

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    setComments(blog.comments)
  }, [])

  const handleCommentChange = () => {
    setNewComment(event.target.value)
  }

  const handleNewComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: newComment
    }
    blogService
      .createComment(blog.id, commentObject)
      .then(comment => setComments(comments.concat(comment)))
    setNewComment('')
  }

  return (
    <div>
      <TextField 
        value={newComment} 
        onChange={handleCommentChange} 
      />
      <Button
        variant="contained"
        onClick={handleNewComment}
      >
      add comment
      </Button>
      {comments.length !== 0 ? 
      <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.content}</li>
      ))}
      </ul>
      : <div>no comments yet</div>
      }
    </div>
  )

}

export default Comments