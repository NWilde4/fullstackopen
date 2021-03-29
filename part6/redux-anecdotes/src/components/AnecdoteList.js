import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const filterText = useSelector(state => state.filter)

  const voteHandler = (anecdote) => {
    dispatch(voteOnAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  const byVotes = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      {anecdotes
        .sort(byVotes)
        .filter(anecdote => 
          anecdote.content
            .toLowerCase()
            .includes(filterText))
        .map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteHandler(anecdote)}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList