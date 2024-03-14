import React from 'react';
import { useUser } from '../services/UserContext';
import AdminSidebar from '../components/adminSidebar';


const UserPage = () => {
  const { user } = useUser();

  if (!user) {
    // Handle the case when the user is not authenticated
    return <p>User not authenticated. Please log in.</p>;
  }

  return (
    <div>
        <AdminSidebar>
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome, {user.name}!</h1>
            <div style={styles.userInfo}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile Number:</strong> {user.mobileNo}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
        </AdminSidebar>
    </div>
    
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    color: '#333',
  },
  userInfo: {
    marginTop: '20px',
  },
};

export default UserPage;
