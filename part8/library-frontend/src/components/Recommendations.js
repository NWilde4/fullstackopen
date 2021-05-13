import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = (props) => {
  const currentUserResult = useQuery(CURRENT_USER)
  const [getFilteredBooks, filteredBooksResult] = useLazyQuery(ALL_BOOKS)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!currentUserResult.loading) {
      if (currentUserResult.data.me) {
        setFavoriteGenre(currentUserResult.data.me.favoriteGenre)
        getFilteredBooks({ variables: { genre: favoriteGenre } }) 
      }
    }
  }, [currentUserResult, favoriteGenre]) // eslint-disable-line 

  useEffect(() => {
    if (filteredBooksResult.data) {
      setBooks(filteredBooksResult.data.allBooks)
    }
  }, [filteredBooksResult]) // eslint-disable-line 

  if (!props.show) {
    return null
  }

  if (filteredBooksResult.loading || currentUserResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre 
      <strong> {favoriteGenre}</strong>
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
    </div>
  )
}

export default Recommendations