const postService = require('../services/postService')

const createPost = async (req, res) => {
    const { title, content, userId } = req.body.data

    try {
        if (!userId) {
            res.status(400).json({message: 'no user id'})
            return;
        }
        if (!title || !content) {
            res.status(400).json({message: 'no title or content'})
            return;
        }
    
        await postService.createPost(title, content, userId)
    
        res.status(200).json({message: "postCreated"})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }
}

const readPost = async (req, res) => {
    const { user_id } = req.query  
    
    try{
        const posts = await postService.readPost(user_id)
        res.status(200).json({data: posts})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }

}

const updatePost = async (req, res) => {
    const { post_id, content } = req.body.data
    try {
        const newPost = await postService.updatePost( post_id, content )
        res.status(201).json({data: newPost})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }
}

const deletePost = async (req, res) => {
    const { post_id } = req.params

    try {
        await postService.deletePost(post_id)
        res.status(204).json({message: 'postingDeleted'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'error'})
    }
}

module.exports = { createPost, readPost, updatePost, deletePost }