import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./Message.css";

function Message({
  message,
  isOwn,
  currentUsername,
  onAddReaction,
  onRemoveReaction,
}) {
  const [showReactions, setShowReactions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🎉"];

  const handleReaction = (emoji) => {
    const reactions = message.reactions || {};
    const hasReacted = reactions[emoji]?.includes(currentUsername);

    if (hasReacted) {
      onRemoveReaction(message.id, emoji);
    } else {
      onAddReaction(message.id, emoji);
    }
    setShowEmojiPicker(false);
  };

  if (message.system) {
    return (
      <div className="system-message">
        <span>{message.message}</span>
      </div>
    );
  }

  const reactions = message.reactions || {};
  const hasReactions = Object.keys(reactions).length > 0;

  return (
    <div className={`message ${isOwn ? "own" : "other"}`}>
      {!isOwn && (
        <div className="message-avatar">{message.sender[0].toUpperCase()}</div>
      )}

      <div className="message-content">
        {!isOwn && <div className="message-sender">{message.sender}</div>}

        <div className="message-bubble-wrapper">
          <div
            className="message-bubble"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            {message.isFile ? (
              <div className="file-message">
                <div className="file-icon">📎</div>
                <div className="file-info">
                  <div className="file-name">{message.fileName}</div>
                  <div className="file-size">
                    {(message.fileSize / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
            ) : (
              <div className="message-text">{message.message}</div>
            )}

            <div className="message-meta">
              <span className="message-time">
                {formatDistanceToNow(new Date(message.timestamp), {
                  addSuffix: true,
                })}
              </span>
              {message.delivered && isOwn && (
                <span className="message-status">✓</span>
              )}
              {message.readBy && message.readBy.length > 1 && isOwn && (
                <span className="message-status read">✓✓</span>
              )}
            </div>

            {showReactions && (
              <div className="reaction-button">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="emoji-trigger"
                >
                  😊
                </button>
              </div>
            )}

            {showEmojiPicker && (
              <div className="emoji-picker">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="emoji-option"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasReactions && (
            <div className="message-reactions">
              {Object.entries(reactions).map(
                ([emoji, users]) =>
                  users.length > 0 && (
                    <button
                      key={emoji}
                      className="reaction-badge"
                      onClick={() => handleReaction(emoji)}
                      title={users.join(", ")}
                    >
                      <span>{emoji}</span>
                      <span className="reaction-count">{users.length}</span>
                    </button>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
