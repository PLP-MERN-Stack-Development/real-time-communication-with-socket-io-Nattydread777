// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users, messages, rooms, and reactions
const users = {};
const messages = [];
const typingUsers = {};
const rooms = { general: [] };
const messageReactions = {};
const readReceipts = {};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { 
      username, 
      id: socket.id, 
      online: true,
      joinedAt: new Date().toISOString() 
    };
    
    // Join general room by default
    socket.join('general');
    rooms.general.push(socket.id);
    
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    
    // Send message history to new user
    socket.emit('message_history', messages.slice(-50));
    
    console.log(`${username} joined the chat`);
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now() + Math.random(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      reactions: {},
      readBy: [socket.id],
    };
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 200) {
      messages.shift();
    }
    
    io.emit('receive_message', message);
    
    // Send delivery acknowledgment
    socket.emit('message_delivered', { id: message.id });
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      socket.broadcast.emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: Date.now() + Math.random(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
      to,
    };
    
    // Send to recipient and sender
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
    
    // Store in messages
    messages.push(messageData);
  });

  // Handle joining rooms
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
    
    if (!rooms[roomName].includes(socket.id)) {
      rooms[roomName].push(socket.id);
    }
    
    io.to(roomName).emit('user_joined_room', {
      username: users[socket.id]?.username,
      room: roomName,
    });
    
    console.log(`${users[socket.id]?.username} joined room: ${roomName}`);
  });

  // Handle leaving rooms
  socket.on('leave_room', (roomName) => {
    socket.leave(roomName);
    
    if (rooms[roomName]) {
      rooms[roomName] = rooms[roomName].filter(id => id !== socket.id);
    }
    
    io.to(roomName).emit('user_left_room', {
      username: users[socket.id]?.username,
      room: roomName,
    });
  });

  // Handle message reactions
  socket.on('add_reaction', ({ messageId, emoji }) => {
    if (!messageReactions[messageId]) {
      messageReactions[messageId] = {};
    }
    
    if (!messageReactions[messageId][emoji]) {
      messageReactions[messageId][emoji] = [];
    }
    
    const userId = socket.id;
    if (!messageReactions[messageId][emoji].includes(userId)) {
      messageReactions[messageId][emoji].push(userId);
    }
    
    io.emit('reaction_added', {
      messageId,
      emoji,
      userId,
      username: users[socket.id]?.username,
      reactions: messageReactions[messageId],
    });
  });

  // Handle removing reactions
  socket.on('remove_reaction', ({ messageId, emoji }) => {
    if (messageReactions[messageId] && messageReactions[messageId][emoji]) {
      messageReactions[messageId][emoji] = messageReactions[messageId][emoji].filter(
        id => id !== socket.id
      );
      
      if (messageReactions[messageId][emoji].length === 0) {
        delete messageReactions[messageId][emoji];
      }
      
      io.emit('reaction_removed', {
        messageId,
        emoji,
        userId: socket.id,
        reactions: messageReactions[messageId],
      });
    }
  });

  // Handle read receipts
  socket.on('mark_read', ({ messageId }) => {
    if (!readReceipts[messageId]) {
      readReceipts[messageId] = [];
    }
    
    if (!readReceipts[messageId].includes(socket.id)) {
      readReceipts[messageId].push(socket.id);
    }
    
    io.emit('message_read', {
      messageId,
      userId: socket.id,
      username: users[socket.id]?.username,
      readBy: readReceipts[messageId],
    });
  });

  // Handle file sharing
  socket.on('send_file', (fileData) => {
    const message = {
      id: Date.now() + Math.random(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      isFile: true,
      fileName: fileData.fileName,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
      fileUrl: fileData.fileUrl,
      reactions: {},
      readBy: [socket.id],
    };
    
    messages.push(message);
    io.emit('receive_message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
    }
    
    // Clean up user from rooms
    Object.keys(rooms).forEach(roomName => {
      rooms[roomName] = rooms[roomName].filter(id => id !== socket.id);
    });
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  const { limit = 50, before } = req.query;
  let filteredMessages = messages;
  
  if (before) {
    const beforeIndex = messages.findIndex(m => m.id === parseInt(before));
    if (beforeIndex > 0) {
      filteredMessages = messages.slice(Math.max(0, beforeIndex - limit), beforeIndex);
    }
  } else {
    filteredMessages = messages.slice(-limit);
  }
  
  res.json(filteredMessages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/rooms', (req, res) => {
  const roomList = Object.keys(rooms).map(name => ({
    name,
    users: rooms[name].length,
  }));
  res.json(roomList);
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    users: Object.keys(users).length,
    messages: messages.length,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

module.exports = { app, server, io }; 