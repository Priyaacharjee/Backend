// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();
// const bcrypt=require('bcrypt');
// const jwt = require('jsonwebtoken');


// app.use(cookieParser());

// app.get("/",function(req,res){
//     let token = jwt.sign({email:"priya@gmail.com"},"secret");
//     res.cookie("token",token);
//     res.send("done");
    
// })

// app.get("/read",function(req,res){
//     let data = jwt.verify(req.cookies.token,"secret");
//     console.log(data);    
// })

//app.get("/read",function(req,res){
    // bcrypt.compare("Priya@123","$2b$10$j37IpqsCzpZaZJbWKk/az.0nhw0j/JHAsQPJfmDW7Ll8Fwm2u1Pxq",function(err,result){
    //     console.log(result);        
    // })

   // console.log(req.cookies.token);  
//})

// app.get("/read",function(req,res){
//     bcrypt.genSalt(10,function(err,salt){
//         bcrypt.hash("Priya@123",salt,function(err,hash){
//            console.log(hash);            
//         })
//     })
// })

//app.listen(3000);

const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/",(req,res)=>{
    res.send("hey");
})

app.get("/create", async (req,res)=>{
    let user= await userModel.create({
        username:"Priya",
        age:23,
        email:"priya@gmail.com"
    });
    res.send(user);
})

app.get("/post/create", async (req,res)=>{
    let post = await postModel.create({
        postdata:"hello everyone",
        user:"68e15be286c3623194694afa"
    })

    let user = await userModel.findOne({_id:"68e15be286c3623194694afa"});
    user.posts.push(post._id);
    await user.save();

    res.send({post,user});
})

app.listen(3000);


