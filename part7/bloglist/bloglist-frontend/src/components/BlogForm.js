import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button
} from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            data-cy="title-field"
            id='title'
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            data-cy="author-field"
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            data-cy="url-field"
            id="url"
            type="text"
            value={newUrl}
            name="URL"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <Button
          variant="contained"
          data-cy="create-button" 
          type="submit"
        >
        create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm