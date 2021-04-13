import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className="notification">
      {(notification && 
        <Alert severity="success">
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification