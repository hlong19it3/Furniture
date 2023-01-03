import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './ResetPassword.css';
import CustomAxios from '../../config/api';

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CustomAxios.post('/api/v1/users/forget-password', {
      email,
    });
    if (res.status === 201) {
      toast.error(res.data.msg, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: '16px',
        },
      });
    }
    if (res.status === 200) {
      navigate('/signin', {
        state: { toastSignInTime: 5000, content: 'New password was sent to your email!', type: 'success' },
      });
    }
  };

  return (
    <div className="bg">
      <ToastContainer />
      <div className="login-page">
        <h4> FURNITURE ONLINE STORE </h4>
        <form onSubmit={handleSubmit} className="form-login">
          <input value={email} placeholder="Email" required onChange={handleChangeEmail}></input>
          <input type="submit" value="Reset password"></input>

          <Link to="/signin" style={{ textDecoration: 'none', fontSize: '19px' }}>
            Sign in
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', fontSize: '19px' }}>
            Or Create new account!
          </Link>
          <Link to="/" style={{ textDecoration: 'none', fontSize: '19px' }}>
            Shop now!
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
