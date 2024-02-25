import React from "react";
import Conversations from "../Conversations/ConversationsList";
import ConversationBody from "../Conversations/ConversationsBody";
import UserDetails from "../UserDetails/UserDetails";
import { useEffect, useState } from "react";
import axios from 'axios';


const Dashboard = () => {

  const [conversationData, setConversationData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatmessages, setmessages] = useState([])
  const [selectedSenderName, setSelectedSenderName] = useState(null);
  const [user1, setuser1] = useState(null);
  const [user2, setuser2] = useState(null);
  const [userId, setUserId] = useState(null);
  const [uniqueId1, setUniqueId1] = useState(null);
  const [uniqueId2, setUniqueId2] = useState(null);
  useEffect(() => {
    // Log the updated values after state has been updated
    console.log('First Unique ID:', uniqueId1);
    console.log('Second Unique ID:', uniqueId2);

    // If you need to perform any additional logic based on the unique IDs, you can do it here.
  }, [uniqueId1, uniqueId2]);





  const hi = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    const fetchConversationDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetchConversationDetails`);
        const conversations = response.data.data;

        const formattedConversations = conversations.map(conversation => {
          const participants = conversation.participants.data;
          const messages = conversation.messages.data;
          const senders = conversation.senders.data;
          const conversationId = conversation.id;

          // Assuming there are only two participants in the conversation
          const sender = participants.find(participant => participant.id === senders[0].id);
          const receiver = participants.find(participant => participant.id === senders[1].id);


          if (sender && receiver) {
            const senderName = sender.name;
            const senderId = sender.id;
            const receiverId = receiver.id;
            const lastMessage = messages.length > 0 ? messages[0].message : 'No messages';
            setuser1(senderId)
            setuser2(receiverId)

            return {
              senderName,
              senderId,
              receiverId,
              lastMessage,
              conversationId,
            };
          }

          return null; // Handle cases where sender is not found
        }).filter(Boolean); // Remove any null entries

        setConversationData(formattedConversations);
      } catch (error) {
        console.error('Error fetching conversation details:', error.message);
      }
    };

    fetchConversationDetails();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/UserId`);
        setUserId(response.data.id);
        console.log("new id:" + userId);
      } catch (error) {
        console.error('Error fetching user ID:', error.message);
      }
    };

    fetchUserId();
  }, []);

  const handleReload = async () => {

  }

  const handleChatClick = async (conversationId) => {
    setSelectedChat(conversationId);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetchMessages/${conversationId}`);
      const messages = response.data.messages;
      setmessages(messages);

      // Retrieve sender name for the selected conversation
      const selectedConversation = conversationData.find(conversation => conversation.conversationId === conversationId);
      if (selectedConversation) {
        const { senderName } = selectedConversation;
        setSelectedSenderName(senderName);
      }

      // Extract unique IDs from the messages
      const uniqueIdsSet = new Set(messages.map(message => message.from.id));
      const uniqueIdsArray = Array.from(uniqueIdsSet);

      // Store the first and second unique IDs globally using state
      if (uniqueIdsArray.length > 0) {
        setUniqueId1(uniqueIdsArray[0]);
        setUniqueId2(uniqueIdsArray[1]);
      }

      console.log('Messages for conversationId:', conversationId);
      console.log(messages);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  useEffect(() => {
    console.log('First Unique ID:', uniqueId1);
    console.log('Second Unique ID:', uniqueId2);
  }, [uniqueId1, uniqueId2]);
  console.log("user1" + user1 + "user2" + user2);
  return (
    <section className="flex w-full h-full text-gray-800">
      <div className="flex flex-col w-1/4">
        <Conversations conversationData={conversationData} selectedChat={selectedChat} handleChatClick={handleChatClick} />
      </div>

      <div className="flex flex-col w-1/2 border-x-2 border-gray-300">
        <ConversationBody conversationData={conversationData} chatmessages={chatmessages} selectedSenderName={selectedSenderName} user1={user1} user2={user2} uniqueId1={uniqueId1} uniqueId2={uniqueId2} handleChatClick={handleChatClick}/>
      </div>

      <div className="flex flex-col w-1/4">
        <UserDetails selectedSenderName={selectedSenderName} />
      </div>
    </section>
  )
}

export default Dashboard;