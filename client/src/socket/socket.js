// socket.js - Socket.io client setup

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Connect to socket server
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  // Send a private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // Join a room
  const joinRoom = (roomName) => {
    socket.emit('join_room', roomName);
  };

  // Leave a room
  const leaveRoom = (roomName) => {
    socket.emit('leave_room', roomName);
  };

  // Add reaction to message
  const addReaction = (messageId, emoji) => {
    socket.emit('add_reaction', { messageId, emoji });
  };

  // Remove reaction from message
  const removeReaction = (messageId, emoji) => {
    socket.emit('remove_reaction', { messageId, emoji });
  };

  // Mark message as read
  const markAsRead = (messageId) => {
    socket.emit('mark_read', { messageId });
  };

  // Send file
  const sendFile = (fileData) => {
    socket.emit('send_file', fileData);
  };

  // Socket event listeners
  useEffect(() => {
    // Connection events
    const onConnect = () => {
      setIsConnected(true);
      console.log('Connected to server');
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    };

    const onConnectError = (error) => {
      console.error('Connection error:', error);
    };

    // Message events
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    const onMessageHistory = (history) => {
      setMessages(history);
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      
      // Show notification for private messages
      if (message.senderId !== socket.id && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(`New message from ${message.sender}`, {
            body: message.message,
            icon: '/chat-icon.png',
          });
        }
      }
    };

    const onMessageDelivered = ({ id }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, delivered: true } : msg
        )
      );
    };

    // User events
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const onUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    // Typing events
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Reaction events
    const onReactionAdded = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, reactions } : msg
        )
      );
    };

    const onReactionRemoved = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, reactions } : msg
        )
      );
    };

    // Read receipt events
    const onMessageRead = ({ messageId, readBy }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, readBy } : msg
        )
      );
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('receive_message', onReceiveMessage);
    socket.on('message_history', onMessageHistory);
    socket.on('private_message', onPrivateMessage);
    socket.on('message_delivered', onMessageDelivered);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);
    socket.on('reaction_added', onReactionAdded);
    socket.on('reaction_removed', onReactionRemoved);
    socket.on('message_read', onMessageRead);

    // Clean up event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('receive_message', onReceiveMessage);
      socket.off('message_history', onMessageHistory);
      socket.off('private_message', onPrivateMessage);
      socket.off('message_delivered', onMessageDelivered);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
      socket.off('reaction_added', onReactionAdded);
      socket.off('reaction_removed', onReactionRemoved);
      socket.off('message_read', onMessageRead);
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom,
    leaveRoom,
    addReaction,
    removeReaction,
    markAsRead,
    sendFile,
  };
};

export default socket; 