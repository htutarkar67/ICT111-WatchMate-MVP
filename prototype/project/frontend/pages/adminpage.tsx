import { useState, useEffect } from 'react';
import { Trash2, Search, Users } from 'lucide-react';
import { apiFetch } from '../lib/api';
import Navbar from '../components/Navbar';
import '../styles/AdminPage.css';

type User = {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
};

type ChatHistory = {
  id: number;
  message: string;
  response: string;
  username: string;
  email: string;
  user_id: number;
  timestamp: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [usersData, chatsData] = await Promise.all([
        apiFetch<{ users: User[] }>('/api/admin/users'),
        apiFetch<{ chats: ChatHistory[] }>('/api/admin/chats?limit=500'),
      ]);
      setUsers(usersData.users || []);
      setChats(chatsData.chats || []);
      if ((usersData.users || []).length > 0) {
        setSelectedUserId((usersData.users || [])[0].id);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(chatId: number) {
    if (!confirm('Delete this conversation? This action cannot be undone.'))
      return;
    try {
      await apiFetch(`/api/admin/chats/${chatId}`, { method: 'DELETE' });
      setChats((prev) => prev.filter((c) => c.id !== chatId));
    } catch (error) {
      console.error('Failed to delete chat:', error);
      alert('Failed to delete chat.');
    }
  }

  async function deleteUser(userId: number) {
    if (
      !confirm(
        'Delete this user and all their data? This action cannot be undone.',
      )
    )
      return;
    try {
      await apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      if (selectedUserId === userId) {
        setSelectedUserId(users.length > 1 ? users[0].id : null);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user.');
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const userChats = selectedUserId
    ? chats.filter((c) => c.user_id === selectedUserId)
    : [];
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (loading)
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading...</div>
      </div>
    );

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-header-bar">
        <h1>Admin Panel</h1>
      </div>

      <div className="admin-main">
        {/* Left Sidebar - Users List */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Users ({filteredUsers.length})</h2>
          </div>

          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="users-list">
            {filteredUsers.length === 0 ? (
              <div className="empty-list">No users found</div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`user-item ${selectedUserId === user.id ? 'active' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-role">
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <button
                    className="delete-user-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user.id);
                    }}
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Chat History */}
        <div className="admin-panel">
          {!selectedUser ? (
            <div className="panel-empty">
              <Users size={48} />
              <p>Select a user to view their chat history</p>
            </div>
          ) : (
            <>
              <div className="panel-header">
                <div>
                  <h2>{selectedUser.username}</h2>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="chat-count">
                  {userChats.length} conversations
                </div>
              </div>

              <div className="chats-container">
                {userChats.length === 0 ? (
                  <div className="empty-state">
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  userChats.map((chat) => (
                    <div key={chat.id} className="chat-message-group">
                      <div className="group-header">
                        <div className="message-timestamp">
                          {formatDateTime(chat.timestamp)}
                        </div>
                        <button
                          className="delete-chat-btn"
                          onClick={() => deleteChat(chat.id)}
                          title="Delete this conversation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="message-pair">
                        <div className="message user-message">
                          <span className="message-label">User</span>
                          <p>{chat.message}</p>
                        </div>

                        <div className="message ai-message">
                          <span className="message-label">AI</span>
                          <p>{chat.response}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
