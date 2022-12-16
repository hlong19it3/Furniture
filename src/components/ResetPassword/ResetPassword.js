import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import CustomAxios from '../../config/api';

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CustomAxios.post('/api/v1/users/forget-password', {
      email,
    });
    if (res.status === 201) {
      setError(res.data.msg);
    }
    if (res.status === 200) {
    }
    navigate('/signin', {
      state: { toastSignInTime: 5000, content: 'New password was sent to your email!', type: 'success' },
    });
    setStatus('New password was sent to your email!');
  };

  return (
    <div className="bg">
      <div className="login-page">
        <h4> FURNITURE ONLINE STORE </h4>
        <form onSubmit={handleSubmit} className="form-login">
          <input value={email} placeholder="Email" required onChange={handleChangeEmail}></input>
          <p>{error}</p>
          <p>{status}</p>

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
