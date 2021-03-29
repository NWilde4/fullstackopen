let timer = undefined

export const setNotification = (notification, seconds) => {
  if (typeof timer === 'number') {
    clearTimeout(timer)
  }
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}


const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer