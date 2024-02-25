require("dotenv").config()
import axios from 'axios';
import Message from '../models/MessageModel';

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN
console.log(MY_VERIFY_TOKEN);

let test =(req, res) => {
    return res.send("Hello Again")
}

let getWebHook = (req, res) => {
  const VERIFY_TOKEN = MY_VERIFY_TOKEN;

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      res.sendStatus(403);
    }
  }
}

let postWebHook = async (req, res) => {
  let body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(async function(entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      if (webhook_event.message && webhook_event.message.text) {
        const receivedMessage = new Message({
          senderId: webhook_event.sender.id,
          recipientId: webhook_event.recipient.id,
          messageText: webhook_event.message.text,
          role:"client",
        });
        await receivedMessage.save();
      } else {
        console.log('Received message does not contain text.');
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};

let pageAccessToken; // Declare the variable outside the function

let exchangeToken = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { accessToken } = req.body;
    // console.log("###" + accessToken);
    
    // Get the user's pages and their access tokens
    const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`;
    const pagesResponse = await axios.get(pagesUrl);

    // Check if there are pages associated with the user
    if (!pagesResponse.data || !pagesResponse.data.data || pagesResponse.data.data.length === 0) {
      console.error('No pages found for the user:', pagesResponse.data);
      return res.status(400).json({ error: 'No pages found for the user' });
    }

    // Assuming you want the access token of the first page in the list
    pageAccessToken = pagesResponse.data.data[0].access_token; // Assign the value
    anotherFunction();
    // Send the page access token back to the frontend
    return res.status(200).json({ access_token: pageAccessToken });
  } catch (error) {
    console.error('Error exchanging tokens:', error.message);
    res.status(500).json({ error: 'Failed to exchange tokens' });
  }
};

// Now you can access `pageAccessToken` elsewhere in the file
const anotherFunction = async() => {
  await pageAccessToken
  console.log('Page Access Token by other function:', pageAccessToken);
  // You can use `pageAccessToken` in other functions as needed
};

// let sendUserId = async (req, res) => {
//   try {
//     const response = await axios.get(`https://graph.facebook.com/v19.0/me?access_token=${pageAccessToken}`);
//     const userId = response.data.id;

//     console.log("sendUserId:" + userId);
//     res.status(200).json({ userId });
//   } catch (error) {
//     console.error('Error fetching user ID:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// New endpoint to handle frontend request
let sendMessageToFrontend = async (req, res) => {
  try {
    const { recipientId, messageText,senderId } = req.body;

    // Save sent message to MongoDB
    const sentMessage = new Message({
      senderId, // Set the senderId as needed
      recipientId,
      messageText,
      sentFromFrontend: true,
      role:"admin",
    });
    await sentMessage.save();

    // Send the message to Facebook Messenger using the Send API
    const url = `https://graph.facebook.com/v13.0/me/messages?access_token=${pageAccessToken}`;

    await axios.post(url, {
      recipient: { id: recipientId },
      message: { text: messageText },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending or saving message:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

let userid
let id = async() =>{
  const url = `https://graph.facebook.com/v19.0/me?access_token=${pageAccessToken}`
  const response = await axios.get(url)
  const id = response.data.id
  userid = id
  console.log("&&&&&&&&" + id);
}


let fetchConversationDetails = async(req, res) => {
  
  const apiUrl = `https://graph.facebook.com/v19.0/${userid}/conversations?fields=participants,messages{id,message,created_time,from,to},senders,wallpaper&access_token=${pageAccessToken}`;
  try {
    await id() 
    const response = await axios.get(apiUrl);
    // console.log('Facebook API response:', response.data);
    const conversations = response.data.data;

      conversations.forEach(conversation => {
          var participants = conversation.participants.data;
          var messages = conversation.messages.data;
          var senders = conversation.senders.data;
          var conversationId = conversation.id;

          // Assuming there are only two participants in the conversation
          const sender = participants.find(participant => participant.id === senders[0].id);
          const senderId = sender.id;
          if (sender) {
              const senderName = sender.name;
              const senderId = sender.id;

              // Get the last message
              const lastMessage = messages.length > 0 ? messages[0].message : 'No messages';

              console.log(`Sender Name: ${senderName}`);
              console.log(`Sender ID: ${senderId}`);
              console.log(`Last Message: ${lastMessage}`);
              console.log(`Conversation ID: ${conversationId}`);
              console.log('------------------------');
              return {
                senderName,
                senderId,
                lastMessage,
                conversationId,
              };
            }
      });
      res.status(200).json({ data: conversations });
    } catch (error) {
      console.error('Error fetching conversation details:-f', error.message);
      res.status(500).json({ error: error.message });
    }
  };





  let fetchMessages = async (req, res) => {
    const { conversationId } = req.params;
    console.log(conversationId);
   const apiUrl = `https://graph.facebook.com/v19.0/${conversationId}?fields=messages{message,created_time,from}&access_token=${pageAccessToken}`;
  
    try {
      const response = await axios.get(apiUrl);
      const messages = response.data.messages.data;
      const messages2 = JSON.stringify(response.data.from);
      const id = JSON.stringify(response.data.messages.data.from);

      console.log("****************" + messages2);
      console.log("-------------" + id);
  
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      res.status(500).json({ error: error.message });
    }
  };

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}

module.exports = {
  test,
  getWebHook,
  postWebHook,
  sendMessageToFrontend,
  fetchConversationDetails, 
  fetchMessages,
  exchangeToken,
  // sendUserId,
}