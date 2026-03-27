import React, { useEffect, useRef } from "react";

const MessageList = ({ messages, currentUserEmail, activeReceiver }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = messages.filter((msg) => {
    // We only have direct messages or broadcasts now, rooms are upcoming
    if (activeReceiver) {
      return (msg.sender === currentUserEmail && msg.receiver === activeReceiver) ||
             (msg.sender === activeReceiver && msg.receiver === currentUserEmail) ||
             (!msg.room && !msg.receiver);
    }
    return !msg.room && !msg.receiver;
  });

  if (filteredMessages.length === 0) {
    return (
      <div className="empty-messages">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {filteredMessages.map((msg, index) => {
        const isOwn = msg.sender === currentUserEmail;
        return (
          <div key={index} className={`message-wrapper ${isOwn ? "message-own" : "message-other"}`}>
            {!isOwn && <div className="message-sender">{msg.sender}</div>}
            <div className="message-content">
              {msg.text}
            </div>
            <div className="message-meta">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;
