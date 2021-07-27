const router = require('express').Router()
const { Post, User, Comment } = require('../../models')

router.post('/newPost', async (req, res) => {
        
        try{
            const newPost = await Post.create({
                title: req.body.title,
                description: req.body.description,
                content: req.body.article,
                user_id: req.session.user_id
            })

            res.status(204).json( { message: "post created"} )

        } catch(err){
        res.status(500).json(err) 
        }
})

router.post('/updatePost', async (req, res) => {
    try{
        const updatePost = await Post.findByPk(req.body.post_id)
        const updated = await updatePost.update({
            title: req.body.title,
            description: req.body.description,
            content: req.body.article,
            user_id: req.session.user_id
        })


        res.status(204).json( { message: "post created"} )

    } catch(err){
    res.status(500).json(err) 
    }
})

router.post('/getPost', async (req, res)=>{
    try{
        const postData = await Post.findByPk(req.body.postId, {
            include: [{ model: User, attributes: {exclude: ['user_id', 'password']} }]
        })

        

        if(!postData){
            res.status(404).json({message: 'Post not found'})
        }

        const data = postData.get({ plain: true})

        res.status(200).json(data)

    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/addComment', async (req, res)=>{
    try{
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        })

        res.status(204).json()
    } catch(err) {
        res.status(500).json(err)
    } 
})  

module.exports = router