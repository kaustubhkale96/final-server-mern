const jwt =require('jsonwebtoken')
const config =require('../config/auth.config')
const db = require('../models')

const User = db.user
const Role = db.role

verifyToken=(req,res,next) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send({
            message:'No Token Provided!'
        })
    }
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err) {
            return res.status(401).send({
                message:'Unauthorized'
            })
        }
        req.userId = decoded.id;
    })
}

isAdmin=(req,res,next) => {
    User.findById(req.userId).exec((err,user)=>{
        if(err) {
            res.status(500).send({
                messege:err
            })
        }
    })
    Role.find({
        _id:{$in:user.roles}
    },(err,roles)=>{
        if(err) {
            res.status(500).send({
                messege:err
            })
        }
        for (let i=0;i<roles.lenght;i++){
            if(roles[i].name==="admin"){
                next();
                return;
            }
        }
        res.status(403).send({
            messege:"Admin Role required!"
        })
    })
}

isModerator =(req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err) {
            res.status(500).send({
                messege:err
            })
        }
    })
    Role.find({
        _id:{$in:user.roles}
    },(err,roles)=>{
        if(err) {
            res.status(500).send({
                messege:err
            })
        }
        for (let i=0;i<roles.lenght;i++){
            if(roles[i].name==="moderator"){
                next();
                return;
            }
        }
        res.status(403).send({
            messege:"Moderator Role required!"
        })
    })
}

const authJWT ={
    verifyToken,
    isAdmin,
    isModerator
}
module.exports = authJWT;