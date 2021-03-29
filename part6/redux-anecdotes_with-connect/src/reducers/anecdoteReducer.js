import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteOnAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'NEW_VOTE',
      data: { anecdote }
    })
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_VOTE':
      const id = action.data.anecdote.id
      const anecdoteWithVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteWithVote,
        votes: anecdoteWithVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
  }

  return state
}

export default anecdoteReducer