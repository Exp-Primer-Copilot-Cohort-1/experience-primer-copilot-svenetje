// Create web server
const express = require('express')
const router = express.Router()

// Import the model
const Comment = require('../models/comment')

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one comment
router.get('/:id', getComment, (req, res) => {
  res.json(res.comment)
})

// Create one comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  })

  try {
    const newComment = await comment.save()
    res.status(201).json(newComment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one comment
router.patch('/:id', getComment, async (req, res) => {
  if (req.body.name != null) {
    res.comment.name = req.body.name
  }
  if (req.body.email != null) {
    res.comment.email = req.body.email
  }
  if (req.body.comment != null) {
    res.comment.comment = req.body.comment
  }
  try {
    const updatedComment = await res.comment.save()
    res.json(updatedComment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one comment
router.delete('/:id', getComment, async (req, res) => {
  try {
    await res.comment.remove()
    res.json({ message: 'Deleted This Comment' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware function for gettig comment object by ID
async function getComment(req, res, next) {
  let comment
  try {
    comment = await Comment.findById(req.params.id)
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot find comment' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.comment = comment
  next()
}

module.exports = router
```

##