# 💬 Real-Time Chat Application with Socket.io

A full-featured real-time chat application built with Socket.io, React, and Node.js/Express. This application demonstrates bidirectional communication between clients and server with modern chat features.

![Chat Application](https://img.shields.io/badge/Status-Complete-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7+-purple)

## 🚀 Features Implemented

### Core Features

- ✅ **Real-time Messaging** - Instant message delivery using Socket.io
- ✅ **User Authentication** - Simple username-based authentication
- ✅ **Online/Offline Status** - See who's currently online
- ✅ **Message History** - Access to previous messages
- ✅ **Connection Status** - Visual indicator of connection state
- ✅ **Auto-reconnection** - Automatic reconnection on network issues

### Advanced Features

- ✅ **Private Messaging** - Direct messages between users
- ✅ **Typing Indicators** - See when someone is typing
- ✅ **Message Reactions** - React to messages with emojis (👍 ❤️ 😂 😮 😢 🎉)
- ✅ **Read Receipts** - Delivery and read status for messages
- ✅ **File Sharing** - Send files and images in chat
- ✅ **Browser Notifications** - Desktop notifications for new messages
- ✅ **User List** - See all online users with ability to DM
- ✅ **System Messages** - Join/leave notifications
- ✅ **Responsive Design** - Works on desktop and mobile devices

## 📁 Project Structure

```
real-time-communication-with-socket-io/
├── client/                     # React front-end
│   ├── src/
│   │   ├── components/         # UI components
│   │   │   ├── ChatRoom.jsx    # Main chat interface
│   │   │   ├── Login.jsx       # Login screen
│   │   │   ├── Message.jsx     # Message component
│   │   │   ├── MessageList.jsx # Message list container
│   │   │   ├── MessageInput.jsx # Message input form
│   │   │   ├── UserList.jsx    # Online users sidebar
│   │   │   └── TypingIndicator.jsx # Typing indicator
│   │   ├── socket/
│   │   │   └── socket.js       # Socket.io client setup & hooks
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js back-end
│   ├── server.js               # Express & Socket.io server
│   ├── package.json
│   └── .env                    # Environment variables
├── README.md                   # This file
└── Week5-Assignment.md         # Assignment instructions
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd real-time-communication-with-socket-io-Nattydread777
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Server (`.env` in `server/` directory):

   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   Client (`.env` in `client/` directory):

   ```env
   VITE_SOCKET_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the server** (in `server/` directory):

   ```bash
   npm run dev
   ```

   Server will run on http://localhost:5000

2. **Start the client** (in `client/` directory):

   ```bash
   npm run dev
   ```

   Client will run on http://localhost:5173

3. **Open multiple browser tabs** to test real-time features with different users

## 🎯 How to Use

1. **Login**: Enter a username to join the chat
2. **Send Messages**: Type in the message input and press Enter or click Send
3. **Private Messaging**: Click on a user in the sidebar to start a private conversation
4. **React to Messages**: Hover over any message and click the 😊 button to add reactions
5. **Share Files**: Click the 📎 button to attach images or files
6. **View Online Users**: Check the sidebar to see who's online
7. **Typing Indicators**: See when others are typing in real-time

## 🔧 Technical Implementation

### Server-Side (Socket.io Events)

- `connection` - Handle new socket connections
- `user_join` - User authentication and joining
- `send_message` - Broadcast messages to all users
- `private_message` - Send direct messages
- `typing` - Broadcast typing indicators
- `join_room` - Join chat rooms
- `add_reaction` - Add emoji reactions to messages
- `mark_read` - Mark messages as read
- `send_file` - Handle file sharing
- `disconnect` - Clean up on user disconnect

### Client-Side (React + Socket.io)

- Custom `useSocket` hook for socket state management
- Real-time message updates with React state
- Browser Notification API integration
- Automatic reconnection handling
- Responsive design with CSS Grid/Flexbox

## 📊 API Endpoints

- `GET /` - Server status
- `GET /health` - Health check with stats
- `GET /api/messages` - Fetch message history (supports pagination)
- `GET /api/users` - Get online users
- `GET /api/rooms` - Get available chat rooms

## 🎨 Features Breakdown

### 1. Real-time Messaging

Messages are instantly delivered to all connected clients using Socket.io's bidirectional communication.

### 2. Private Messaging

Users can click on any online user to start a private conversation. Private messages are only visible to sender and recipient.

### 3. Typing Indicators

When a user types, others see a "... is typing" indicator that disappears after 1 second of inactivity.

### 4. Message Reactions

Users can react to any message with 6 emojis. Multiple users can add the same reaction, and the count is displayed.

### 5. Read Receipts

Messages show:

- ✓ (single check) - Message delivered
- ✓✓ (double check, green) - Message read

### 6. File Sharing

Users can share images and files up to reasonable size limits. Files are displayed with filename and size.

### 7. Browser Notifications

Desktop notifications appear for new messages when the app is in the background (requires permission).

## 🚀 Deployment

### Option 1: Deploy to Render

1. Server: Deploy the `server/` directory to Render
2. Client: Deploy the `client/` directory to Render
3. Update environment variables in Render dashboard

### Option 2: Deploy to Railway

1. Connect your GitHub repository
2. Deploy server and client as separate services
3. Configure environment variables

### Option 3: Deploy to Heroku + Vercel

1. Server: Deploy to Heroku
2. Client: Deploy to Vercel
3. Update CORS and socket URLs

## 📱 Responsive Design

The application is fully responsive and works on:

- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🔐 Security Considerations

For production deployment, consider:

- Implement proper authentication (JWT, OAuth)
- Add rate limiting
- Sanitize user inputs
- Use HTTPS/WSS
- Implement message encryption
- Add CSRF protection
- Validate file uploads

## 🐛 Known Issues & Limitations

- File sharing uses data URLs (not suitable for large files in production)
- No persistent storage (messages lost on server restart)
- No user registration/password authentication
- Limited to in-memory storage

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication with JWT
- [ ] Multiple chat rooms
- [ ] Voice/Video calling
- [ ] Message search functionality
- [ ] Message editing and deletion
- [ ] User profiles with avatars
- [ ] Dark mode
- [ ] Message encryption
- [ ] File upload to cloud storage

## 📚 Technologies Used

**Frontend:**

- React 18
- Socket.io Client
- Vite
- date-fns
- React Icons
- CSS3

**Backend:**

- Node.js
- Express
- Socket.io
- CORS
- dotenv

## 👨‍💻 Developer

Built as part of PLP MERN Stack Development course - Week 5 Assignment

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

---

**Note**: Remember to install dependencies and configure environment variables before running the application!
