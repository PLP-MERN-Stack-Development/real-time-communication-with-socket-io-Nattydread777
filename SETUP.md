# 🚀 Quick Setup Guide

Follow these steps to get the application running:

## 1. Install Server Dependencies

```bash
cd server
npm install
```

This will install:

- express
- socket.io
- cors
- dotenv
- nodemon (dev dependency)

## 2. Install Client Dependencies

```bash
cd ../client
npm install
```

This will install:

- react
- react-dom
- socket.io-client
- react-icons
- date-fns
- vite
- @vitejs/plugin-react

## 3. Start the Server

```bash
cd server
npm run dev
```

The server will start on http://localhost:5000

## 4. Start the Client (in a new terminal)

```bash
cd client
npm run dev
```

The client will start on http://localhost:5173

## 5. Test the Application

1. Open http://localhost:5173 in your browser
2. Enter a username and click "Join Chat"
3. Open another browser tab/window with the same URL
4. Enter a different username
5. Start chatting!

## 🎯 Testing Features

### Real-time Messaging

- Send messages in one tab and see them appear in the other instantly

### Private Messaging

- Click on a user in the sidebar to start a private conversation

### Typing Indicators

- Start typing in one tab and see the typing indicator in the other

### Message Reactions

- Hover over a message and click the 😊 button to add reactions

### File Sharing

- Click the 📎 button to attach a file

### Browser Notifications

- Allow notifications when prompted
- Minimize the window and receive a notification for new messages

## 📝 Notes

- The server must be running before starting the client
- Make sure ports 5000 and 5173 are available
- For the best experience, test with at least 2 browser windows/tabs

## 🐛 Troubleshooting

**Port already in use:**

```bash
# Find process using the port (Windows PowerShell)
Get-NetTCPConnection -LocalPort 5000
# Or for client
Get-NetTCPConnection -LocalPort 5173

# Kill the process if needed
Stop-Process -Id <PID>
```

**Dependencies not installing:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

**Socket connection fails:**

- Check that the server is running
- Verify the VITE_SOCKET_URL in client/.env matches the server URL
- Check browser console for errors

## 🎉 Enjoy!

Your real-time chat application is now ready to use!
