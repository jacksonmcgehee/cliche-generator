var express = require('express')
var router = express.Router()

const Post = require('../db/models/Post')

/* GET users listing. */
router.get('/', (req, res) => {
  Post.find({})
  .then((posts) => {
    res.json(posts)
  }).catch((error) => {
    console.log(error)
  })
})

router.post('/', (req, res) => {
  const newPost = new Post(req.body)
  newPost.save()
  .then((post) => {
    res.json(post)
  }).catch(console.log)
})

module.exports = router
