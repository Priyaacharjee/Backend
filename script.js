//const fs = require('fs');

// fs.writeFile("hey.txt","Priya Acharjee",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

// fs.appendFile("hey.txt"," She loves someone",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

// fs.rename("hey.txt","hello.txt",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

// fs.copyFile("hello.txt","./copy.txt",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

// fs.unlink("hello.txt",function(err){
//     if(err) console.error(err);
//     else console.log("removed");
// })

// fs.rm("./copy",{recursive:true},function(err){
//     if(err) console.log(err);
//     else console.log("removed");
// })

// const http = require('http');

// const server = http.createServer(function(req,res){
//     res.end("helllo world");
// })

// server.listen(3000);

const express = require('express')
const app = express()

//app.get(Router,requestHandler)

// app.use(function(req,res,next){
//     console.log('middleware');
//     next();
// });

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.send('Hello world from Priya')
})

app.get('/profile', function(req,res,next){
    //res.send('Hello you know what! forget him')
    return next(new Error("something went wrong"))
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000)