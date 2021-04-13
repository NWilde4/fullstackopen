
const userReducer = (state =  null, action) => {
  switch(action.type) {
  case 'LOGIN_USER':
    return action.user
  case 'LOGOUT_USER':
    return null
  }

  return state
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export default userReducer