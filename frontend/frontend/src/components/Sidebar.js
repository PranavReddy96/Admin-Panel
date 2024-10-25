import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/add-user">Add User</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
