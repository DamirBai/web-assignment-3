const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')


router.get('/', async(req,res) => {
    try{
           const blogs = await Blog.find()
           res.json(blogs)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const blog = await Blog.findById(req.params.id)
           res.json(blog)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        createdAt : req.body.createdAt
    })

    try{
        const a1 =  await blog.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.put('/:id',async(req,res)=> {
    try{
        const blog = await Blog.findById(req.params.id) 
        blog.title = req.body.title
        blog.author = req.body.author
        const a1 = await blog.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).send('Blog not found');
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

module.exports = router