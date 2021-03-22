import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: 'John McClain'}
  })
  fireEvent.change(titleInput, {
    target: { value: 'Die Hard 3'}
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.google.com'}
  })

  fireEvent.submit(form)
  console.log(createBlog.mock.calls[0][0]['title'])
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('John McClain')
  expect(createBlog.mock.calls[0][0].title).toBe('Die Hard 3')
  expect(createBlog.mock.calls[0][0].url).toBe('www.google.com')

})