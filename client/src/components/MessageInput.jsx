import { useState, useRef, useEffect } from "react";
import "./MessageInput.css";

function MessageInput({ onSendMessage, onTyping, onFileSelect }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicator
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      onTyping(true);
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsTyping(false);
      onTyping(false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a server
      // For now, we'll create a mock file URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <button
          type="button"
          className="attach-button"
          onClick={handleAttachClick}
          title="Attach file"
        >
          📎
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        <textarea
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="message-input"
          rows={1}
          maxLength={1000}
        />

        <button
          type="submit"
          className="send-button"
          disabled={!message.trim()}
          title="Send message"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
