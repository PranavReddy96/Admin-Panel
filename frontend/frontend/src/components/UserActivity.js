import React, { useEffect, useState } from 'react';

const UserActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/analytics/user-activity', { method: 'GET', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      const data = await response.json();
      setActivities(data);
    };
    fetchActivities();
  }, []);

  return (
    <div className="card">
      <h2>User Activity Logs</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity._id}>{activity.action} - {activity.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivity;
