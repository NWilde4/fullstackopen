import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

//const getId = () => (100000 * Math.random()).toFixed(0)

// export const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     votes: 0
//   }
// }

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

// export const voteOnAnecdote = (id) => {
//   return ({
//       type: 'NEW_VOTE',
//       data: { id }
//   })
// }

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