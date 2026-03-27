import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import UserList from "../../components/chat/UserList";
import ChatWindow from "../../components/chat/ChatWindow";

const Chat = () => {
  const { user } = useAuth();
  const { messages, activeUsers, isConnected, sendMessage, joinRoom } = useSocket(user);
  
  const [activeReceiver, setActiveReceiver] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  const handleSelectUser = (selectedEmail) => {
    setActiveReceiver(selectedEmail);
    setIsMobileSidebarOpen(false); // Hide sidebar on mobile after selection
  };

  return (
    <div className="chat-layout">
      {/* Sidebar - Toggled on mobile */}
      <div className={`sidebar ${isMobileSidebarOpen ? 'mobile-open' : 'mobile-closed'}`}>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? "online" : "offline"}`}></span>
          {isConnected ? "Connected" : "Disconnected"}
          {/* Close Sidebar Button for Mobile */}
          <button className="mobile-close-btn" onClick={() => setIsMobileSidebarOpen(false)}>×</button>
        </div>
        
        <div className="room-controls">
          <h4 className="section-title">Rooms <span className="upcoming-badge">(Upcoming Soon)</span></h4>
          <input 
            type="text" 
            placeholder="Room feature is disabled" 
            className="input-field room-input"
            disabled
          />
        </div>

        <UserList 
          users={activeUsers} 
          currentUserEmail={user?.email} 
          onSelectUser={handleSelectUser}
          activeReceiver={activeReceiver}
        />
      </div>
      
      <div className={`main-chat-area ${!isMobileSidebarOpen ? 'mobile-active' : 'mobile-inactive'}`}>
        <ChatWindow 
          messages={messages} 
          currentUserEmail={user?.email}
          activeReceiver={activeReceiver}
          onSendMessage={(text) => sendMessage(activeReceiver, text, null)}
          onBackToUsers={() => setIsMobileSidebarOpen(true)}
        />
      </div>
    </div>
  );
};

export default Chat;
