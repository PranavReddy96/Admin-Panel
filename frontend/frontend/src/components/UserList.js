import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import EditUser from './EditUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getusers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust as per your authentication logic
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowAddUser(false);
  };

  const handleEditUser = (user) => {
    setEditUserData(user);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map(user => (user._id === updatedUser._id ? updatedUser : user)));
    setEditUserData(null);
  };

  const handleShowAddUser = () => {
    setShowAddUser(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <button onClick={handleShowAddUser}>Add User</button>
      {showAddUser && (
        <AddUser onAddUser={handleAddUser} onClose={() => setShowAddUser(false)} />
      )}
      {editUserData && (
        <EditUser userToEdit={editUserData} onUpdateUser={handleUpdateUser} onClose={() => setEditUserData(null)} />
      )}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => handleEditUser(user)}>Edit</button>
            {/* You can add a delete button here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
