import React from "react";
import { AiOutlineAlignLeft, AiOutlineReload } from "react-icons/ai";

const ConversationList = (props) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-5 px-8">
        <div className="flex gap-6 items-center cursor-pointer">
          <AiOutlineAlignLeft className="w-6 h-6" />
          <h1 className="text-3xl font-bold ">Conversations</h1>
        </div>
        <AiOutlineReload className="w-6 h-6 cursor-pointer" />
      </div>
      <ul>
        {props.conversationData.map((conversation, index) => (
          <li
            key={index}
            className={
              props.selectedChat === conversation.conversationId
                ? "selected bg-gray-200"
                : ""
            }
            onClick={() => props.handleChatClick(conversation.conversationId)}
          >
            <div className="flex">
              <input className="h-4 w-4 m-4" type="checkbox" />
              <div className="block">
                <strong className="opacity-80 size-8">
                  {conversation.senderName}
                </strong>
                <p className="text-xs font-bold opacity-80">Facebook DM</p>
              </div>
            </div>
            <strong className="text-sm opacity-65 m-5 mt-[-5px]">
              {conversation.lastMessage}
            </strong>
            <hr />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ConversationList;
