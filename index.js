const express = require('express');
const app=express();
const path=require('path');
const{v4 : uuid4}=require('uuid');
const methodOverride= require("method-override");

// const { title } = require('process');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const port=3000;

let posts = [
    {
        id : uuid4(),
        title: "My First Post",
        content: "This is the content of my first post."    
    },
    {
        id : uuid4(),
        title: "My Second Post",
        content: "This is the content of my second post."
    },
    {
        id : uuid4(),
        title: "My Third Post",
        content: "This is the content of my third post."
    }
];

app.get('/posts', (req, res) => {
    res.render("home.ejs", { posts });
    
});

app.get('/posts/new', (req, res) => {
    res.render("add.ejs");

});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    let id=uuid4();
    posts.push({id, title, content });
    res.redirect('/posts');
    
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    post.content = req.body.content;
    res.redirect('/posts');
});

app.get('/posts/:id/edit',(req,res)=>{
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete('/posts/:id',(req,res)=>{
    const { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});