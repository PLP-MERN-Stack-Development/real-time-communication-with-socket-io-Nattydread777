import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { useSocket } from "./socket/socket";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { connect, disconnect, isConnected } = useSocket();

  useEffect(() => {
    // Request notification permission on load
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Cleanup on unmount
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    connect(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    disconnect();
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
