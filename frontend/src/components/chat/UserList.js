import React from "react";

const UserList = ({ users, currentUserEmail, onSelectUser, activeReceiver }) => {
  const otherUsers = users.filter((u) => u.email !== currentUserEmail);

  return (
    <div className="user-list-container">
      <h4 className="section-title">Direct Messages</h4>
      {otherUsers.length === 0 ? (
        <p className="empty-state">No other users online</p>
      ) : (
        <ul className="user-list">
          {otherUsers.map((u, index) => (
            <li 
              key={index} 
              className={`user-item ${activeReceiver === u.email ? "active" : ""}`}
              onClick={() => onSelectUser(u.email)}
            >
              <div className="user-avatar">{u.name.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <span className="user-name">{u.name}</span>
                <span className="user-role">{u.role}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
