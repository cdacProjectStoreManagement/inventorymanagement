import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from '../config/config.json'

export function Signup() {
  const [name, setName] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role,setRole]=useState('');
  const [bussinessId, setBussinessId] = useState();

  const url =config.apiUrl+"/users";

  // get the navigation function
  const navigate = useNavigate()

  const onSignup = async () => {
    //debugger;
    if (firstName.length === 0) {
      toast.warn('enter first name')
    } else if (lastName.length === 0) {
      toast.warn('enter last name')
    } else if (email.length === 0) {
      toast.warn('enter email')
    } else if (password.length === 0) {
      toast.warn('enter password')
    } else if (confirmPassword.length === 0) {
      toast.warn('enter confirm password')
    } else if (password !== confirmPassword) {
      toast.warn('password does not match')
    }else if (mobileNo.length !== 10) {
      toast.warn('enter valid mobile number')
    }
    else {
      // make the api call
      try {
        setName(firstName + " " + lastName);
        const body = {
          name,
          email,
          password,
          mobileNo,
          role,
          bussinessId,
        };
  
        const response = await axios.post(url, body);
  
        if (response.status === 201) {
          toast.done('User added successfully');
          // Optionally, you can navigate to the signin page or another page after successful signup.
          navigate('/signin');
        } else {
          toast.error('Error adding user. Please try again.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('An error occurred during signup. Please try again.');
      }
    }
    };

  return (
    <>
    <br/>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
          <div className='mb-3 bg-dark text-light'>
          <h1 className=' text-center'>Signup</h1>
          </div>
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Last Name</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                className='form-control'
              />
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
              <label htmlFor=''>mobileNo </label>
              <input
                onChange={(e) => setmobileNo(e.target.value)}
                type='tel'
                placeholder='123456789'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Role</label><br/>
              <select  className='mb-3' id="role" name="role" onChange={(e)=>setRole(e.target.value) }>
                <option value="admin" selected="selected">Admin</option>
                <option value="storemanager"> STORE MANAGER</option>
                <option value="biller">BILLER</option>
                <option value="warehousemanager">WAREHOUSE MANAGER</option>	
              </select>
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
              <label htmlFor=''>Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                placeholder='xxxxxxxx'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>StoreId/WarehouseId/BussinessId</label>
              <input
                onChange={(e) => setBussinessId(e.target.value)}
                type='number'
                className='form-control'
              />
              </div>
            <div className='mb-3'>
              <div>
                Already got an account? <Link to='/singin'>Signin here</Link>
              </div>
              <button onClick={onSignup} className='btn btn-primary mt-2'>
                Signup
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}

export default Signup;
