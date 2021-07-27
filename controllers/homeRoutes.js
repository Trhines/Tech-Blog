const router = require('express').Router()
const auth = require('../utils/helpers')
const { Post, User, Comment } = require('../models')

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/signUp', (req, res)=>{
    res.render('signUp')
})

router.get('/', async (req, res)=>{
    try{
        const getPosts = await Post.findAll()
        
        const posts = getPosts.map((post) => post.get({ plain: true }));
        

        res.render('homepage', { posts, logged_in: req.session.logged_in })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', auth, async (req, res)=>{
    try{
        const getPosts = await Post.findAll({where: {user_id: req.session.user_id}})
        
        const posts = getPosts.map((post) => post.get({ plain: true }));
     

        res.render('dashboard', { posts, logged_in: req.session.logged_in })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/newPost', auth, (req, res)=>{
    res.render('newPost')
})

router.get('/viewPost', auth, async (req, res)=>{
   const postId = req.url.split("=")[1]
   try{
        const postData = await Post.findByPk(postId, {
            include: [
            { model: Comment, include:[{model:User, attributes: {exclude: ['user_id', 'password']} }] }, 
            { model: User, attributes: {exclude: ['user_id', 'password']} }
        ]
        })

        if(!postData){
            res.status(404).json({message: 'Post not found'})
        }

        const data = postData.get({ plain: true})
        res.render('viewPost', { data, logged_in: req.session.logged_in })

    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/editPost', auth, async (req, res)=>{
    
    const postId = req.url.split("=")[1]
    try{
        const postData = await Post.findByPk(postId)
        if(!postData){
            res.status(404).json({message: 'no post found with this id'})
        }
        const post = postData.get({ plain: true })
        res.render('edit', {post, logged_in: req.session.logged_in})
    } catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;