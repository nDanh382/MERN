const express = require('express');
const PostModel = require('../models/Post')
const postsRouter = express.Router();
const verifyAccessToken = require('../Middleware/auth')

// Show posts
// Type: get
// private
postsRouter.get('/', verifyAccessToken, async (req, res) => {
    try {
        PostModel.find({
            user: req.userId
        })
        .populate('user', ['username'])
        .then((data) => {
            return res.json({
                success: true,
                data: data
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: error
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(405)
    }
})



// Create posts
// Type: post
// private
postsRouter.post('/', verifyAccessToken , async (req, res)=> {
    const {title, description, url, status} = req.body;
    if(!title){
        return res.json({
            success: false,
            message: "Bạn chưa nhập tiêu đề"
        })
    };
    try {
        await PostModel.create({
            title: title,
            description: description,
            url: url.startsWith('https://')? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
            
        })
        .then((data) => {
            if(data){
                return res.json({
                    success: true,
                    message: "Đăng post thành công"
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Posting Problem"
                })
            }
        })
        .catch((err)=> {
            console.log(err)
            res.json("Loi")
        })
    } catch (error) {
        console.log(error);
        res.json("Post Database problem")
    }
})

// Update posts
// Type: put
// private

postsRouter.put('/:id', verifyAccessToken , async (req, res, next) => {
    let {title, description, url, status } = req.body;
    if(!title){
        return res.json("Bạn chưa nhập title");
    };
    let updateData = {
        title: title,
        description: description || '',
        url: url || '',
        status: status || 'TO LEARN'
    }
    let updateConditions = {
        _id: req.params.id,
        user: req.userId
    }
    try {
        await PostModel.findOneAndUpdate(updateConditions, updateData, {new: true})
        .then((data) => {
            return res.json({
                success: true,
                message: data
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: "Update error"
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }


})

// Delete posts
// Type: delete
// private

postsRouter.delete('/:id', verifyAccessToken , async (req, res, next) => {
    let updateConditions = {
        _id: req.params.id,
        user: req.userId
    }
    try {
        await PostModel.findOneAndDelete(updateConditions, {new: true})
        .then((data) => {
            return res.json({
                success: true,
                message: data
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: "Delete error"
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }


})



module.exports = postsRouter;