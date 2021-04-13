import React from 'react'
const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          data-cy="username-field"
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          data-cy="password-field"
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button data-cy="login-button" type="submit">login</button>
    </form>
  )
}

export default Login