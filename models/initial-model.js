const db = require("../models");
const Role =db.role

module.exports = initial =()=>{
    Role.estimatedDocumentCount ((err,count)=>{
        if(!err && count ===0){
            new Role({
                name:"user"
            }).save(err=>{
                if(err){
                    console.log("error",err)
                }
            })
            console.log("successfully added 'user' to roles collection")

            new Role({
                name:"moderator"
            }).save(err=>{
                if(err){
                    console.log("error",err)
                }
            })
            console.log("successfully added 'moderator' to roles collection")

            new Role({
                name:"Admin"
            }).save(err=>{
                if(err){
                    console.log("error",err)
                }
            })
            console.log("successfully added 'admin' to roles collection")
        }
    })
}