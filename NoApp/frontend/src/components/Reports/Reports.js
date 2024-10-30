import React, { useEffect, useState } from 'react';
import './Reports.css';
import axios from 'axios';

const Reports = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://NoApp-backend.cloud-stacks.com/api/tasks');
        const tasks = response.data;

        const now = new Date();
        const upcomingNotifications = tasks.filter(task => {
          const timeDiff = new Date(task.dueDate) - now;
          return timeDiff > 0 && timeDiff <= 86400000; // 24 hours in milliseconds
        });

        setNotifications(upcomingNotifications);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="reports-container">
      <h1>Due Date Reminders</h1>
      <div className="notifications">
        {notifications.map(notification => (
          <div key={notification.id} className="notification">
            <div className="notification-content">
              <h2>{notification.title}</h2>
              <p>Due in {Math.round((new Date(notification.dueDate) - new Date()) / 3600000)} hours</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
