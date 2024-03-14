import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from '../services/UserContext'; // Import the useUser context
import config from '../config/config.json'
export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser function from useUser context
  const url = config.apiUrl+"/users/signin";

  const onSignin = async () => {
    if (email.length === 0 || password.length === 0) {
      toast.warn('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post(url, { email, password });

      if (response.status === 200) {
        // Assuming the response includes user details and token
        const { user, token } = response.data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        // Update user context with roles
        setUser(user);
        console.log(user);
        toast.success('User signed in successfully');
        navigate('/dashboard'); // Redirect to the dashboard or any other route
      } else {
        toast.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in');
    }
  };

  return (
    <div>
      <br/>
      <br/>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
          <div className='mb-3 bg-dark text-light'>
          <h1 className=' text-center'>Signin</h1>
          </div>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='abc@test.com'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='xxxxxxxx'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <div>
                Don't have an account? <Link to='/signup'>Signup here</Link>
              </div>
              <button onClick={onSignin} className='btn btn-primary mt-2'>
                Signin
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default Signin;
