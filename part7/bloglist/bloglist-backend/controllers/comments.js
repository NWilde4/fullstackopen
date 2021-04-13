const router = require('express').Router()
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { title: 1})
  response.json(comments)
})

module.exports = router