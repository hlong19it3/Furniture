import { Link, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import './Signin.css';
import CustomAxios from '../../config/api';
import { Toast } from '../Toast';
import { AuthContext } from '~/contexts/AuthContextProvider';
import { toast, ToastContainer } from 'react-toastify';

function Login(props) {
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const { state } = useLocation();
  const [stateLocal, setStateLocal] = useState({
    content: 'Welcome to Furniture Online Store!',
    toastSignInTime: 5000,
    type: 'success',
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeInput, setTypeInput] = useState('password');

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showEye, setShowEye] = useState(false);

  useEffect(() => {
    if (showHidePassword === true) {
      setTypeInput('text');
    } else {
      setTypeInput('password');
    }
  }, [showHidePassword]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CustomAxios.post('/api/v1/users/signin', {
      email,
      password,
    });
    if (res.status === 201) {
      toast.error(res.data.msg, {
        position: 'bottom-right',
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        hideProgressBar: false,
        progress: undefined,
        style: {
          fontSize: '16px',
        },
        theme: 'colored',
      });
    }
    if (res.status === 200) {
      localStorage.setItem('userInfo', JSON.stringify(res.data.tokens));
      setToken(JSON.stringify(res.data.tokens));
      // console.log(res.data.tokens);
      navigate('/', {
        state: { toastSignInTime: 5000, content: 'Welcome to Furniture Online Store!', type: 'success' },
      });
    }
  };

  return (
    <div className="w-screen h-screen bg flex">
      <ToastContainer />
      <div className="flex-1 flex flex-col justify-center items-center">
        <h4 className="text-slate-700"> WELCOME TO FURNITURE ONLINE STORE </h4>
        <input
          className=" border-none outline-none bg-slate-100 text-base w-96  mt-4 rounded-md p-2 "
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <div className="flex flex-col mt-2 w-96 ">
          <div className=" flex relative">
            <input
              className="px-2 py-2 border-none outline-none bg-slate-100 w-full text-base rounded-md"
              placeholder="Password"
              value={password}
              type={typeInput}
              onChange={handleChangePassword}
              onFocus={() => setShowEye(true)}
              onBlur={() => (password ? setShowEye(true) : setShowEye(false))}
            />
            {showEye && (
              <span
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowHidePassword(!showHidePassword)}
              >
                {!showHidePassword ? <AiFillEyeInvisible color="rgb(55 65 81)" /> : <AiFillEye color="rgb(55 65 81)" />}
              </span>
            )}
          </div>
          <Link to="/resetpassword" className="text-sm  flex flex-1 justify-end">
            Forgot password?
          </Link>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-slate-500 border border-slate-800 w-40  mt-3 text-xl p-1 text-fuchsia-50 hover:text-white hover:bg-slate-800 rounded-md"
        >
          SIGN IN
        </button>
        <div className="text-base">Or</div>
        <Link
          to="/signup"
          className="bg-slate-500 border border-slate-800 w-40 h-9 text-xl p-1 text-fuchsia-50 hover:text-white hover:bg-slate-800 rounded-md text-center"
        >
          SIGN UP
        </Link>
        <Link to="/" className="text-base font-semibold text-green-800 mt-3">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
export default Login;
