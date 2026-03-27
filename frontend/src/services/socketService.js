import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.url = process.env.REACT_APP_SOCKET_URL || "http://localhost:5001";
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url, { transports: ["websocket"] });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected() {
    return this.socket ? this.socket.connected : false;
  }

  join(user) {
    if (this.socket) {
      this.socket.emit("join", user);
    }
  }

  joinRoom(room, user) {
    if (this.socket) {
      this.socket.emit("joinRoom", { room, user });
    }
  }

  sendMessage(messagePayload) {
    if (this.socket) {
      this.socket.emit("sendMessage", messagePayload);
    }
  }

  // Common listeners pattern
  onMessage(callback) {
    if (this.socket) {
      this.socket.on("message", callback);
      return () => this.socket.off("message", callback);
    }
    return () => {};
  }

  onUserList(callback) {
    if (this.socket) {
      this.socket.on("userList", callback);
      return () => this.socket.off("userList", callback);
    }
    return () => {};
  }

  onConnect(callback) {
    if (this.socket) {
      this.socket.on("connect", callback);
      return () => this.socket.off("connect", callback);
    }
    return () => {};
  }

  onDisconnect(callback) {
    if (this.socket) {
      this.socket.on("disconnect", callback);
      return () => this.socket.off("disconnect", callback);
    }
    return () => {};
  }
}

export const socketService = new SocketService();
