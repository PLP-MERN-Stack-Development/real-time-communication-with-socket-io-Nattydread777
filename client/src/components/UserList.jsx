import "./UserList.css";

function UserList({ users, currentUsername, selectedUser, onSelectUser }) {
  const otherUsers = users.filter((user) => user.username !== currentUsername);

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Online Users</h3>
        <span className="user-count">{users.length}</span>
      </div>

      <div className="user-list-content">
        {otherUsers.length === 0 ? (
          <div className="no-users">
            <p>No other users online</p>
          </div>
        ) : (
          otherUsers.map((user) => (
            <button
              key={user.id}
              className={`user-item ${
                selectedUser?.id === user.id ? "active" : ""
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="user-item-avatar">
                {user.username[0].toUpperCase()}
              </div>
              <div className="user-item-info">
                <div className="user-item-name">{user.username}</div>
                <div className="user-item-status">
                  <span className="status-dot online"></span>
                  <span>Online</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;
