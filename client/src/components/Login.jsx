import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>💬 Real-Time Chat</h1>
          <p>Connect and chat with people in real-time</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Enter your username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username..."
              maxLength={20}
              autoComplete="off"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!username.trim()}
          >
            Join Chat
          </button>
        </form>

        <div className="login-footer">
          <p className="text-xs text-gray-500">
            Built with Socket.io • React • Node.js
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
