import { useEffect, useState, useCallback } from "react";
import { socketService } from "../services/socketService";

/**
 * Custom hook to manage socket state and actions
 * @param {Object} user User object containing email, name, role
 */
export const useSocket = (user) => {
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    socketService.connect();
    
    // Subscribe to events
    const unsubscribeConnect = socketService.onConnect(() => {
      setIsConnected(true);
      socketService.join(user);
    });

    const unsubscribeDisconnect = socketService.onDisconnect(() => {
      setIsConnected(false);
    });

    const unsubscribeMessage = socketService.onMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    const unsubscribeUserList = socketService.onUserList((list) => {
      setActiveUsers(list);
    });

    // Handle existing connection edge case
    if (socketService.isConnected()) {
      setIsConnected(true);
      socketService.join(user);
    }

    return () => {
      unsubscribeConnect();
      unsubscribeDisconnect();
      unsubscribeMessage();
      unsubscribeUserList();
      socketService.disconnect();
    };
  }, [user]);

  const sendMessage = useCallback((receiver, text, room = null) => {
    if (!user) return;

    const messagePayload = {
      sender: user.email,
      receiver: receiver || null,
      text,
      timestamp: new Date().toISOString(),
      room,
    };

    socketService.sendMessage(messagePayload);
    
    // Optimistically update UI
    setMessages((prev) => [...prev, messagePayload]);
  }, [user]);

  const joinRoom = useCallback((room) => {
    if (!user || !room) return;
    socketService.joinRoom(room, user);
  }, [user]);

  return {
    messages,
    activeUsers,
    isConnected,
    sendMessage,
    joinRoom,
  };
};
