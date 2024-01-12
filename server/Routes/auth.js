const express = require('express');
const authRouter = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../models/User')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyAccessToken = require('../Middleware/auth')

//authentication
//Check user is logged info
authRouter.get('/', verifyAccessToken ,async (req, res) => {
    UserModel.findById(req.userId).select("-password")
    .then((data) => {
        if(!data){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };
        res.json({
            success: true,
            data: data
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    })
})





//Register
authRouter.post('/register', async (req, res, next)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        return res.status(500).json({
            success: false,
            message: "Bạn nhập thiếu tài khoản hoặc mật khẩu"
        });
    }
        await UserModel.findOne({username: username})
        .then(async (data) => {
            if(data){
                return res.json({
                    success: false,
                    message: "Tài khoản đã tồn tại"
                });
            };
            const newHashPassword = await argon2.hash(password);
            await UserModel.create({
                username: username,
                password: newHashPassword
            })
            .then((data)=>{
                let token = jwt.sign({_id: data._id}, process.env.REGISTER_JWT_SECRET);
                return res.json({
                    success: true,
                    message: "Đăng kí thành công",
                    accessToken: token
                })
            })
            .catch((err)=> {
                res.json({
                    success: false,
                    message: "Database error"
                })
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json("Invalid server")
        })
        
    
    
})



//Login
//try catch use for connect DB 

authRouter.post('/login', async (req, res)=> {
    let username = req.body.username;
    let userPassword = req.body.password;
    if(!username || !userPassword){
        return res.status(500).json("Bạn nhập thiếu tài khoản hoặc mật khẩu");
    }
    try {
        await UserModel.findOne({
            username: username 
        })
        .then(async (data)=> {
            if(!data){
                return res.json({
                    success: false,
                    message: "Sai tài khoản hoặc mật khẩu"
                });
            };
            await argon2.verify(data.password, userPassword)
            .then((argon2Match)=> {
                if(argon2Match){
                    let token = jwt.sign({
                        _id: data._id
                    }, process.env.REGISTER_JWT_SECRET)
                    return res.json({
                        success: true,
                        message: "Đăng nhập thành công",
                        accessToken: token
                    })

                } else {
                    return res.json({
                        success: false,
                        message: "Sai tài khoản hoặc mật khẩu"
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err)=> {
            return res.json("Invalid server")
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Database error"
        })
    }
})




module.exports = authRouter;
