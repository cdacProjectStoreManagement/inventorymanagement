// Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';


const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <Link to='/'>Home</Link>
      {/* You can customize this component with more content or styling */}
    </div>
  );
};

export default Unauthorized;
