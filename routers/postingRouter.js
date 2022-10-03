const express = require('express');
const postController = require('../controllers/postController')

const router = express.Router();

router.post('', postController.createPost)
router.get('', postController.readPost)
// app.get('/posts/:user_id', readPostsByUser2)  //함수 하나로 합체!
router.patch('/update', postController.updatePost)
router.delete('/delete/:post_id', postController.deletePost)

module.exports = router 