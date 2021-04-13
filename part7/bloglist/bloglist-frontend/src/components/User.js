import React from 'react'
import { useParams } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

const User = ({ user, blogs }) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User