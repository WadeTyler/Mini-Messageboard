// Index.js

const express = require('express');
const app = express();
const path = require('path');


// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true}));

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

// Routes
app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get('/new', (req, res) => {
    res.render("new");
});

app.post('/new', (req, res) => {
    const { user, text } = req.body;

    messages.push({ text: text, user: user, added: new Date()});
    
    res.redirect("/");
});

app.get('/message', (req, res) => {
    const id = req.query.id;
    console.log(id);
    if (id !== undefined && messages[id]) {
        const message = messages[id];
        res.render("message", { message: message });
    }
    else {
        res.status(404).send("Message not found");
    }
});

app.listen(8080);