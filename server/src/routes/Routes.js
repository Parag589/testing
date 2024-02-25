import express from "express";
import chatbotController from "../controllers/Controller";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", chatbotController.test)
    
    router.get("/webhook", chatbotController.getWebHook)
    router.post("/webhook", chatbotController.postWebHook)
    router.post('/send-message', chatbotController.sendMessageToFrontend);
    router.post('/exchangeToken', chatbotController.exchangeToken);
    router.get('/fetchConversationDetails', chatbotController.fetchConversationDetails);
    router.get('/fetchMessages/:conversationId', chatbotController.fetchMessages);

    
    return app.use("/", router);
}

module.exports = initWebRoutes