# 🎯 Quick Reference Card

## Installation & Setup

### One-Line Install (Windows)

```powershell
.\install.ps1
```

### One-Line Start (Windows)

```powershell
.\start.ps1
```

### Manual Start

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

---

## 🔑 Key URLs

- **Client:** http://localhost:5173
- **Server:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **API Messages:** http://localhost:5000/api/messages
- **API Users:** http://localhost:5000/api/users

---

## ⌨️ Keyboard Shortcuts

| Action       | Shortcut           |
| ------------ | ------------------ |
| Send message | `Enter`            |
| New line     | `Shift + Enter`    |
| Focus input  | Click message area |

---

## 🎮 How to Use Features

### Send Message

1. Type in message box
2. Press Enter or click Send button

### Private Message

1. Click user in sidebar
2. Type message
3. Press Enter

### Add Reaction

1. Hover over any message
2. Click 😊 button
3. Select emoji

### Share File

1. Click 📎 button
2. Select file
3. File appears in chat

### View Online Users

- Check left sidebar
- Green dot = online

### Return to General Chat

- Click "Back to General" button (when in DM)

---

## 🐛 Troubleshooting

### Port Already in Use

```powershell
# Find and kill process on port 5000
Get-NetTCPConnection -LocalPort 5000 | ForEach-Object { Stop-Process -Id $_.OwningProcess }

# Find and kill process on port 5173
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess }
```

### Can't Connect to Server

1. Check server is running (Terminal 1)
2. Check URL in client/.env: `VITE_SOCKET_URL=http://localhost:5000`
3. Restart both server and client

### Dependencies Not Installing

```bash
npm cache clean --force
rm -r node_modules
rm package-lock.json
npm install
```

### Browser Notifications Not Working

1. Check browser permissions
2. Allow notifications when prompted
3. Test by minimizing window and receiving message

---

## 📊 Server Events

### Emit (Client → Server)

- `user_join` - Join chat with username
- `send_message` - Send public message
- `private_message` - Send private message
- `typing` - Toggle typing indicator
- `join_room` - Join a room
- `leave_room` - Leave a room
- `add_reaction` - Add reaction to message
- `remove_reaction` - Remove reaction
- `mark_read` - Mark message as read
- `send_file` - Share file

### Listen (Server → Client)

- `connect` - Connection established
- `disconnect` - Connection lost
- `receive_message` - New public message
- `private_message` - New private message
- `message_history` - Past messages
- `user_list` - Online users list
- `user_joined` - User joined notification
- `user_left` - User left notification
- `typing_users` - Typing status
- `reaction_added` - Reaction added
- `reaction_removed` - Reaction removed
- `message_read` - Read receipt
- `message_delivered` - Delivery receipt

---

## 🎨 Emoji Reactions

Available reactions:

- 👍 Thumbs up
- ❤️ Love
- 😂 Laugh
- 😮 Wow
- 😢 Sad
- 🎉 Celebrate

---

## 📁 Project Structure

```
├── server/
│   ├── server.js          # Main server
│   ├── package.json       # Dependencies
│   └── .env              # Config
├── client/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── socket/       # Socket setup
│   │   ├── App.jsx       # Main app
│   │   └── main.jsx      # Entry
│   ├── package.json      # Dependencies
│   └── .env             # Config
├── README.md             # Main docs
├── SETUP.md             # Setup guide
├── FEATURES.md          # Feature docs
└── install.ps1          # Install script
```

---

## 🔧 Configuration

### Server (.env)

```
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env)

```
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📝 Testing Checklist

- [ ] Login with username
- [ ] Send public message
- [ ] See typing indicator
- [ ] Send private message
- [ ] Add reaction to message
- [ ] Share a file
- [ ] Check online users
- [ ] Test on mobile view
- [ ] Enable notifications
- [ ] Test with 2+ users

---

## 🚀 Deployment Options

### Render

1. Deploy server folder
2. Deploy client folder
3. Update env vars

### Railway

1. Connect GitHub repo
2. Deploy as 2 services
3. Configure env vars

### Heroku + Vercel

1. Server → Heroku
2. Client → Vercel
3. Update URLs

---

## 📚 Documentation Files

- `README.md` - Complete project overview
- `SETUP.md` - Setup instructions
- `FEATURES.md` - Feature showcase
- `COMPLETION_SUMMARY.md` - Project status
- `Week5-Assignment.md` - Assignment brief

---

## 💡 Tips

1. Open 2+ browser tabs to test
2. Use different usernames
3. Try all emoji reactions
4. Test file sharing with images
5. Enable browser notifications
6. Try private messaging
7. Test responsive on mobile
8. Check typing indicators

---

## ⚡ Performance

- **Message Limit:** 200 messages
- **Reconnection:** 5 attempts
- **Typing Timeout:** 1 second
- **Supported Files:** Images, PDFs, Docs
- **Max Users:** Unlimited (memory permitting)

---

**Need help?** Check the full documentation in README.md
