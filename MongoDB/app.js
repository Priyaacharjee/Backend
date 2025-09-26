const express = require('express');
const app=express();

const userModel= require(`./userModel`)

app.get('/',(req,res)=>{
    res.send("hey");
})

app.get('/create',async (req,res)=>{
    let createduser = await userModel.create({
        name:"Keya",
        email:"keya@gmail.com",
        username:"Keya"
    })

    res.send(createduser);
})

app.get('/read',async (req,res)=>{
    let users=await userModel.find();

    res.send(users);
})

app.get('/update',async (req,res)=>{
    let updateduser = await userModel.findOneAndUpdate({username:"Priya"},{username:"Priya Acharjee"},{new:true})

    res.send(updateduser);
})

app.get('/delete',async (req,res)=>{
    let deleteuser=await userModel.findOneAndDelete({username:"Keya"});

    res.send(deleteuser);
})


app.listen(3000);