import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({ messages, currentUserEmail, activeReceiver, onSendMessage, onBackToUsers }) => {
  const getChatTargetName = () => {
    if (activeReceiver) return activeReceiver;
    return "Select a user to start messaging";
  };

  const isInputDisabled = !activeReceiver;

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <button className="mobile-back-btn" onClick={onBackToUsers}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 className="chat-header-title">{getChatTargetName()}</h3>
      </div>
      
      <div className="chat-messages-area">
        <MessageList 
          messages={messages} 
          currentUserEmail={currentUserEmail}
          activeReceiver={activeReceiver}
        />
      </div>
      
      <div className="chat-input-area">
        <MessageInput 
          onSendMessage={onSendMessage} 
          disabled={isInputDisabled}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
