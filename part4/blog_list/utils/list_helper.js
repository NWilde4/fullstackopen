const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
  const likes = posts.reduce((sum, post) => {
    return sum + post.likes
  }, 0)

  return likes
}

const favoriteBlog = (posts) => {
  const mostLiked = posts.reduce((previous, current) => {
    return (previous.likes > current.likes) ? previous : current
  })
  const {url, _id, __v, ...rest} = mostLiked
  return rest 
}

// const mostBlogs = (posts) => {
//   const authorArray = _.map(posts, 'author')
//   const mostCommonAuthor = _
//     .chain(authorArray)
//     .countBy()
//     .pairs()
//     .max(_.last)
//     .head()
//     .value()

//   return mostCommonAuthor
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs
}