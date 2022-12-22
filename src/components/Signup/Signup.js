import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import './Signup.css';

import CustomAxios from '../../config/api';
import { toast, ToastContainer } from 'react-toastify';
// import { data } from 'autoprefixer'

function Signup(props) {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [typeInput, setTypeInput] = useState('password');

  useEffect(() => {
    if (showHidePassword === true) {
      setTypeInput('text');
    } else {
      setTypeInput('password');
    }
  }, [showHidePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await CustomAxios.post('/api/v1/users/signup', {
        firstName,
        lastName,
        email,
        address,
        phone,
        password,
      });

      nav('/signin');
    } else {
      toast.error('Wrong repeat password', {
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
  };

  return (
    <div className="w-screen h-screen bg flex">
      <ToastContainer />
      <div className="flex-1 flex flex-col justify-center items-center mt-4">
        <h4 className="text-slate-700"> WELCOME TO FURNITURE ONLINE STORE </h4>
        <form className="flex-1 flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96 rounded-md mt-4 p-2 "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            minLength={3}
            maxLength={25}
          />
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96  mt-2 rounded-md p-2 "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
            minLength={3}
            maxLength={25}
          />
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96  mt-2 rounded-md p-2 "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            minLength={10}
            maxLength={11}
          />
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96  mt-2 rounded-md p-2 "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            minLength={3}
            maxLength={300}
          />
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96  mt-2 rounded-md p-2 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className=" border-none outline-none bg-slate-100 text-base w-96  mt-2 rounded-md p-2 "
            value={password}
            placeholder="Password"
            type={typeInput}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <div className="flex flex-col mt-2 w-96 ">
            <div className=" flex relative">
              <input
                className="px-2 py-2 border-none outline-none bg-slate-100 w-full text-base rounded-md"
                placeholder="Password"
                value={confirmPassword}
                type={typeInput}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setShowEye(true)}
                onBlur={() => (password ? setShowEye(true) : setShowEye(false))}
              />
              {showEye && (
                <span
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowHidePassword(!showHidePassword)}
                >
                  {!showHidePassword ? (
                    <AiFillEyeInvisible color="rgb(55 65 81)" />
                  ) : (
                    <AiFillEye color="rgb(55 65 81)" />
                  )}
                </span>
              )}
            </div>
          </div>

          <button
            // onClick={handleSubmit}
            type="submit"
            className="bg-slate-500 border border-slate-800 w-40 mt-3 text-xl p-1 text-fuchsia-50 hover:text-white hover:bg-slate-800 rounded-md"
          >
            SIGN UP
          </button>
        </form>
        <div className="text-base ">Already have account?</div>
        <Link
          to="/signin"
          className="bg-slate-500 border border-slate-800 w-40 h-9 text-xl p-1 text-fuchsia-50 hover:text-white hover:bg-slate-800 rounded-md text-center"
        >
          SIGN IN
        </Link>
        <Link to="/" className="text-base font-semibold text-green-800 mt-3">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}

export default Signup;
