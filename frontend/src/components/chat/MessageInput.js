import React, { useState } from "react";
import Button from "../common/Button/Button";

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input-field"
        placeholder={disabled ? "Select a user to chat" : "Type a message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
      />
      <Button type="submit" variant="primary" disabled={disabled || !message.trim()}>
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
