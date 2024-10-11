// Index.js

const express = require('express');
const app = express();
const path = require('path');
const messagesRoutes = require("./routes/messagesRoutes");


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
app.use('/', messagesRoutes);


// app.get('/message', (req, res) => {
//     const id = req.query.id;
//     console.log(id);
//     if (id !== undefined && messages[id]) {
//         const message = messages[id];
//         res.render("message", { message: message });
//     }
//     else {
//         res.status(404).send("Message not found");
//     }
// });

app.listen(8080);