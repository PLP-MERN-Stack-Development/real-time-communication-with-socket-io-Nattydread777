import { useState } from "react";
import { useSocket } from "../socket/socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import TypingIndicator from "./TypingIndicator";
import "./ChatRoom.css";

function ChatRoom({ username, onLogout }) {
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    addReaction,
    removeReaction,
    sendFile,
  } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true);

  const handleSendMessage = (message) => {
    if (selectedUser) {
      sendPrivateMessage(selectedUser.id, message);
    } else {
      sendMessage(message);
    }
  };

  const handleFileSelect = (fileData) => {
    sendFile(fileData);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleBackToGeneral = () => {
    setSelectedUser(null);
  };

  return (
    <div className="chat-room">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <button
              className="menu-button"
              onClick={() => setShowUserList(!showUserList)}
            >
              ☰
            </button>
            <div className="header-info">
              <h2>
                {selectedUser ? `@${selectedUser.username}` : "# General Chat"}
              </h2>
              <div className="connection-status">
                <span
                  className={`status-indicator ${
                    isConnected ? "connected" : "disconnected"
                  }`}
                ></span>
                <span className="status-text">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="current-user">
              <span className="user-avatar">{username[0].toUpperCase()}</span>
              <span className="username">{username}</span>
            </div>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="chat-content">
          {/* User List Sidebar */}
          <div
            className={`user-list-sidebar ${showUserList ? "show" : "hide"}`}
          >
            <UserList
              users={users}
              currentUsername={username}
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
            />
          </div>

          {/* Messages Area */}
          <div className="messages-area">
            {selectedUser && (
              <div className="private-chat-header">
                <button onClick={handleBackToGeneral} className="back-button">
                  ← Back to General
                </button>
                <p className="text-sm text-gray-500">
                  Private conversation with {selectedUser.username}
                </p>
              </div>
            )}

            <MessageList
              messages={messages.filter((msg) => {
                if (selectedUser) {
                  return (
                    msg.isPrivate &&
                    (msg.senderId === selectedUser.id ||
                      msg.to === selectedUser.id)
                  );
                }
                return !msg.isPrivate;
              })}
              currentUsername={username}
              onAddReaction={addReaction}
              onRemoveReaction={removeReaction}
            />

            <TypingIndicator
              typingUsers={typingUsers.filter((u) => u !== username)}
            />

            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={setTyping}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
