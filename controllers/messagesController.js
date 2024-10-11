
const db = require('../db/queries');

const getAllMessages = async (req, res) => {
    const messages = await db.getAllPosts();
    console.log(messages);
    res.render('index', { messages: messages, title: "Home" });
}

const getNewMessageForm = async (req, res) => {
    res.render('new');
}

const postNewMessage = async (req, res) => {
    const { username, message } = req.body;
    var userid = await db.getUserIDByName(username);

    if (userid === -1) {
        userid = await db.createNewUser(username);
    }
    console.log(`userid: ${userid}`)

    const date = new Date().toLocaleDateString();
    await db.createNewPost(userid, message, date);

    res.redirect('/');
}

const getMessage = async (req, res) => {
    const messageid = req.query.id;

    const message = await db.getMessage(messageid);
    console.log(message);
    res.render("message", { message: message });
}


module.exports = {
    getAllMessages,
    getNewMessageForm,
    postNewMessage,
    getMessage
}