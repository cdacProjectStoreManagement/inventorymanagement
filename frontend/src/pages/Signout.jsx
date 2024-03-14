// Signout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';

function Signout() {
  const { signout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Call the signout function from the context to sign the user out
    signout();

    // Redirect to the home page after signing out
    navigate('/');
  }, [signout, navigate]);

  return (
    <div>
      <h2>Signing Out...</h2>
      <p>thank you for using.....</p>
    </div>
  );
}

export default Signout;
