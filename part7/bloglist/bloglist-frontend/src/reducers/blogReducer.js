

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_LIKE':
    const likedBlogId = action.data.id
    const blogWithLike = state.find(b => b.id === likedBlogId)
    const blogWithLikeAdded = {
        ...blogWithLike, 
        likes: blogWithLike.likes + 1
    }
    return state.map(blog => 
      blog.id !== likedBlogId ? blog : blogWithLikeAdded
    )
  case 'DELETE_BLOG':
    const deletedBlogId = action.data.id
    const deletedBlog = state.find(b => b.id === deletedBlogId)
    return state.filter(blog =>
      deletedBlogId !== blog.id
    )
  }

  return state
}

export const createBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: content
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'DELETE_BLOG',
    data: blog
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const addLike = (blog) => {
  return {
    type: 'ADD_LIKE',
    data: blog
  }
}

export default blogReducer