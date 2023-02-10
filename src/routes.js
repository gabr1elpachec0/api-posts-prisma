const { Router } = require('express')
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')

const router = Router()

//User
router.get('/user', UserController.getUsers)
router.post('/user', UserController.createUser)
router.delete('/user/:id', UserController.deleteUser)
router.put('/user/:id', UserController.updateUser)

// Post
router.post('/post/user/:id', PostController.createPost)
router.get('/post', PostController.getPosts)
router.put('/post/:id', PostController.updatePost)
router.delete('/post/:id', PostController.deletePost)

module.exports = router
