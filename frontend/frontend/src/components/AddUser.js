import React, { useState } from 'react';
import { createUser } from '../api';

const AddUser = ({ onAddUser, onClose }) => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(user);
      onAddUser(newUser);
      setUser({ username: '', email: '', password: '' });
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Add User</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddUser;
