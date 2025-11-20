import { useEffect, useRef } from "react";
import Message from "./Message";
import "./MessageList.css";

function MessageList({
  messages,
  currentUsername,
  onAddReaction,
  onRemoveReaction,
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>No messages yet</h3>
          <p>Start the conversation by sending a message!</p>
        </div>
      ) : (
        messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isOwn={message.sender === currentUsername}
            currentUsername={currentUsername}
            onAddReaction={onAddReaction}
            onRemoveReaction={onRemoveReaction}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
