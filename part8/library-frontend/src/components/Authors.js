import React from 'react'
import { useQuery } from '@apollo/client'
import EditAuthor from './EditAuthor'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (result.loading && props.show)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditAuthor 
        authors={authors} 
        token={props.token}
      />
    </div>
  )
}



export default Authors

