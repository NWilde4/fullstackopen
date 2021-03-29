
export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
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