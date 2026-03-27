const users = {};

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // Handle user joining
    socket.on("join", (user) => {
      try {
        if (!user || !user.email) return;
        
        users[user.email] = { ...user, socketId: socket.id };
        io.emit("userList", Object.values(users));
        console.log(`[Socket] ${user.name} joined`);
      } catch (error) {
        console.error("[Socket] Join Error:", error);
      }
    });

    socket.on("sendMessage", (data) => {
      try {
        const { sender, receiver, text, timestamp, room, type, fileUrl, fileName } = data;
        const payload = { sender, receiver, text, timestamp, room, type, fileUrl, fileName };
        
        if (room) {
          // Room message: emit to everyone in the room
          io.to(room).emit("message", payload);
        } else if (receiver) {
          // Direct message
          const recipientSocket = users[receiver]?.socketId;
          if (recipientSocket) {
            io.to(recipientSocket).emit("message", payload);
          }
          // Emit to sender so they see their own message
          io.to(socket.id).emit("message", payload);
        } else {
          // Broadcast message
          io.emit("message", payload);
        }
      } catch (error) {
        console.error("[Socket] Send Message Error:", error);
      }
    });

    // Handle user joining a specific room
    socket.on("joinRoom", ({ room, user }) => {
      try {
        if (!room) return;
        socket.join(room);
        console.log(`[Socket] ${user.name} joined room: ${room}`);
      } catch (error) {
        console.error("[Socket] Join Room Error:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`[Socket] User disconnected: ${socket.id}`);
      let userEmailToRemove = null;

      for (const email in users) {
        if (users[email].socketId === socket.id) {
          userEmailToRemove = email;
          delete users[email];
          break;
        }
      }

      if (userEmailToRemove) {
        io.emit("userList", Object.values(users));
        console.log(`[Socket] User ${userEmailToRemove} removed from session`);
      }
    });
  });
};

module.exports = { handleSocketConnection };
