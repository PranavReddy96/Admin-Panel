import React, { useEffect, useState } from 'react';

const EditUser = ({ userId }) => {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/getuser/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/updateuser/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      alert('User updated successfully!');
    } else {
      alert('Failed to update user');
    }
  };

  return (
    <div className="card">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
