
const { Router } = require('express');
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");

messagesRouter.get('/', messagesController.getAllMessages);
messagesRouter.get('/new', messagesController.getNewMessageForm);
messagesRouter.post('/new', messagesController.postNewMessage);
messagesRouter.get('/message', messagesController.getMessage);

module.exports = messagesRouter;