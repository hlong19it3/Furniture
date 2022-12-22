import React, { useContext } from 'react';
// import { BiChat, BiSearch, BiUserCircle } from 'react-icons/bi';
import { BsFillCartFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import configFile from '~/config';
import { AuthContext } from '~/contexts/AuthContextProvider';
import useCartContext from '~/hooks/useCartContext';
import { Search } from '../Search';

function Header() {
  const nav = useNavigate();
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const [stateCart, dispatchCart] = useCartContext();
  const handleLogin = () => {
    nav('/signin');
  };
  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    setCurrentUser('');
    nav('/');
  };
  const tokens = localStorage.getItem('userInfo');

  return (
    <div className="z-50 top-0 sticky">
      <header className="flex py-4 shadow-sm bg-white h-24 ">
        <div className="container flex items-center justify-between">
          <Link to={configFile.routes.home}>
            <img
              src="https://marketplace.canva.com/EAFN9EmLAUY/1/0/1600w/canva-black-minimalist-furniture-logo-IBXwe4b5u8M.jpg"
              alt="Logo"
              className="w-32"
            />
          </Link>

          <div className="w-full max-w-xl relative flex">
            <Search />
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to={configFile.routes.cart}
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <BsFillCartFill />
              </div>

              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                {stateCart ? stateCart.length : 0}
              </div>
            </Link>
            <HeadlessTippy
              visible
              interactive
              render={(attrs) => (
                <div className="flex flex-col w-90 m-h-content rounded-lg shadow " tabIndex="-1" {...attrs}>
                  <Link to={configFile.routes.profile} className="flex w-full py-2 px-3 text-lg hover:bg-slate-700">
                    <CiViewList className="font-bold text-slate-700 hover:text-white" />
                    <div className="hover:text-white">My Profile</div>
                  </Link>
                  <Link
                    to={configFile.routes.orderHistory}
                    className="flex w-full py-2 px-3 text-lg hover:bg-slate-700"
                  >
                    <CiViewList className="font-bold text-slate-700 hover:text-white" />
                    <div className="hover:text-white">My Orders</div>
                  </Link>
                  <Link
                    to={configFile.routes.changePassword}
                    className="flex w-full py-2 px-3 text-lg hover:bg-slate-700"
                  >
                    <CiViewList className="font-bold text-slate-700 hover:text-white" />
                    <div className="hover:text-white">Change My Password</div>
                  </Link>
                </div>
              )}
            >
              <div className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                  <FaUserAlt />
                </div>
              </div>
              {/* <div className="text-xl leading-3">Account</div> */}
            </HeadlessTippy>
          </div>
        </div>
      </header>
      <nav className="bg-gray-800 ">
        <div className="container flex">
          <div className="px-8 py-4 bg-slate-500 flex items-center cursor-pointer relative group">
            <span className="text-white">
              <i className="fa-solid fa-bars"></i>
            </span>
            <span className="capitalize ml-2 text-white">Shop</span>

            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible"></div>
          </div>

          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <a href="../" className="text-gray-200 hover:text-white transition">
                Home
              </a>
              <a href="##" className="text-gray-200 hover:text-white transition">
                About us
              </a>
              <a href="##" className="text-gray-200 hover:text-white transition">
                Contact us
              </a>
            </div>
            {tokens ? (
              <button href="##" onClick={handleSignOut} className="text-gray-200 hover:text-white transition">
                Sign out
              </button>
            ) : (
              <button href="##" onClick={handleLogin} className="text-gray-200 hover:text-white transition">
                Sign in/Sign up
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
