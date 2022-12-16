import React from 'react';
// import { BiChat, BiSearch, BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Header() {
  const nav = useNavigate();
  const handleLogin = () => {
    nav('/signin');
  };
  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    nav('/');
  };
  const tokens = localStorage.getItem('userInfo');

  return (
    <div className="z-50">
      <header className="flex py-4 shadow-sm bg-white h-32 ">
        <div className="container flex items-center justify-between">
          <a href="index.html">
            <img
              src="https://img.freepik.com/free-vector/furniture-logo_23-2148613625.jpg?w=740&t=st=1670919607~exp=1670920207~hmac=459481d738b51b045afba4cb953468c6d79c718cc7570becdba55551e5c43a37"
              alt="Logo"
              className="w-32"
            />
          </a>

          <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
              placeholder="Search"
            />
            <button className="bg-slate-500 border border-primary text-white px-8 rounded-r-md hover:bg-slate-700 hover:text-primary transition ">
              Search
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a href="##" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                8
              </div>
            </a>
            <a href="##" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div className="text-xl leading-3">Cart</div>
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-slate-500 text-white text-xs">
                2
              </div>
            </a>
            <a href="##" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-regular fa-user"></i>
              </div>
              <div className="text-xl leading-3">Account</div>
            </a>
          </div>
        </div>
      </header>
      <nav className="bg-gray-800">
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
