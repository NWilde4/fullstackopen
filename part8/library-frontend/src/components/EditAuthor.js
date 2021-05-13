import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from '../queries'

const EditAuthor = ({ authors, token }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR)

  const submit = (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name, setBornTo: Number(born) } })

    setName(authors[0].name)
    setBorn('')
  }

  if (!token) {
    return <div></div>
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select
          value={name}
          onChange={({ target }) => setName(target.value)}     
        >
          {authors.map(author => {
            return (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            )})
          }
        </select>
        <div>
          born
          <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor

