import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/Freelancer/notifications', {
          headers: {
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
        } else {
          console.error('Failed to fetch notifications:', response.status);
        }
      } catch (error) {
        console.error('Error during notification fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h1 className="notifications-heading">
        <FontAwesomeIcon icon={faBell} /> Notifications
      </h1>

      {loading && <p className="text-muted">Loading notifications...</p>}

      {!loading && notifications.length === 0 && <p className="text-muted">No notifications available.</p>}

      {!loading && notifications.length > 0 && (
        <div className='notify'>
{notifications.map((notification) => (
  <div key={notification._id}>
    <Card className="mb-3">
      <Card.Body>
        <Card.Text className="mb-0 text-white">{notification.message}</Card.Text>
        <Badge pill variant="info" className="mt-2">
          {new Date(notification.createdAt).toLocaleString()}
        </Badge>
      </Card.Body>
    </Card>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default Notifications;
