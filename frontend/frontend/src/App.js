import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserActivity from './components/UserActivity';
import './App.css'; // Import CSS for styling

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <Sidebar />
          <div className="content">
            <h1>Admin Panel</h1>
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/add-user" element={<UserForm />} />
              <Route path="/analytics" element={<UserActivity />} />
              <Route path="/" element={<div>Welcome to the Dashboard!</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
