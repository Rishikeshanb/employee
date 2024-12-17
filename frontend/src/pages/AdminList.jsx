import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminList.css';

const AdminList = () => {
  const admins = [
    { id: 1, head: 'Rishi', email: 'Rishiadmin1@example.com', domain: 'Cloud' },
    { id: 2, head: 'Keshan', email: 'Keshanadmin2@example.com', domain: 'Fullstack' },
  ];

  const [activeAdmin, setActiveAdmin] = useState(null);

  const handleAdminClick = (id) => {
    setActiveAdmin(id);
  };

  return (
    <div className="admins">
      <h1>Admin's List</h1>
      {admins.map((admin) => (
        <div
          key={admin.id}
          className={`admin-card ${activeAdmin === admin.id ? 'active' : ''}`}
          onClick={() => handleAdminClick(admin.id)}
        >
          <p>
            <span className="label">HEAD:</span> <strong>{admin.head}</strong>
          </p>
          <p>
            <span className="label">Email:</span> <strong>{admin.email}</strong>
          </p>
          <p>
            <span className="label">Domain:</span> <strong>{admin.domain}</strong>
          </p>
          {activeAdmin === admin.id && (
            <Link to="/form">
              <button className="small-button">Join</button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminList;

