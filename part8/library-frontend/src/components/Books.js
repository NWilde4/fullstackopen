import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState(null)

  if (result.loading && props.show) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  let books = result.data.allBooks

  const genres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  if (genreFilter) {
    books = books.filter(book => book.genres.includes(genreFilter))
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter 
        ? <div>
          in genre <strong>{genreFilter}</strong>
         </div> 
        : null
      }      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button 
          key={genre}
          onClick={() => setGenreFilter(genre)}
        >
          {genre}
        </button>
       )}
      <button onClick={() => setGenreFilter(null)}>all genres</button>
    </div>
  )
}

export default Books