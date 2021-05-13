import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

const Navigation = ({ token, logout, setPage }) => {
  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommend')}>recommend</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [loggedInUser, setLoggedInUser] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      alert(`${addedBook.title} added.`)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <Navigation 
        token={token} 
        logout={logout} 
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setLoggedInUser={setLoggedInUser}
      />

      <Recommendations 
        show={page === 'recommend'}
        loggedInUser={loggedInUser}
      />

    </div>
  )
}

export default App