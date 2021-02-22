import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Vote = ({handleClick}) => (
  <button onClick={handleClick}>vote</button>
  )

const NextButton = ({handleClick}) => (
  <button onClick={handleClick}>next anecdote</button>
  )

const MostVoted = ({votes}) => {
  let mostVotedIndex = votes.indexOf(Math.max(...votes))
  return <p>{anecdotes[mostVotedIndex]}</p>
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  let initialVoteArray = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVoteArray)

  let selectAnecdote = () => {
    let maxLength = anecdotes.length;
    let randomIndex = Math.floor(Math.random() * (maxLength));
    setSelected(randomIndex);
  };

  let addVote = () => {
    let newArray = [...votes]
    newArray[selected]++
    setVotes(newArray)
  }
  
  let indexOfCurrentAnecdote

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Vote handleClick={addVote} />
      <NextButton handleClick={selectAnecdote} />
      <h1>Anecdote with most votes</h1>
      <MostVoted votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)