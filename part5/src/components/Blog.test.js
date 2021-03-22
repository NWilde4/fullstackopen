import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let currentUser
  let blog

  beforeEach(() => {
    currentUser = {
      name: 'Current User',
      username: 'current_user'
    }

    blog = {
      author: 'John McClain',
      url: 'www.google.com',
      title: 'Die Hard 3',
      likes: 654,
      user: currentUser
    }

    component = render(
      <Blog blog={blog} currentUser={currentUser}/>
    )

  })

  test('renders content when details hidden', () => {
    const div = component.container.querySelector('.blogWithoutDetails')

    expect(div).toHaveTextContent('Die Hard 3')
    expect(div).toHaveTextContent('John McClain')
    expect(div).not.toHaveTextContent('www.google.com')
    expect(div).not.toHaveTextContent('654')
  })

  test('renders content when details shown', () => {
    const div = component.container.querySelector('.blogWithDetails')
    
    expect(div).toHaveTextContent('www.google.com')
    expect(div).toHaveTextContent('654')
  })
})

