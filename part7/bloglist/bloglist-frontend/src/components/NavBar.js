import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar, 
  Toolbar, 
  Button
} from '@material-ui/core'
const NavBar = ({ username, handleLogout }) => {
  const padding = {
    padding: 5
  }


  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to ='/'>blogs</Button>
        <Button color='inherit' component={Link} to ='/users'>users</Button>
        <em style={padding}>{username} logged in</em>
        <Button color='inherit' component={Link} to ='/users' onClick={handleLogout}>logout</Button>
      </Toolbar>
    </AppBar>
  )  

  return (
    <div>
      <Link style={padding} to ='/'>blogs</Link>
      <Link style={padding} to ='/users'>users</Link>
      <em style={padding}>{username} logged in</em>
      <button style={padding} onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar