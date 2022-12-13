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
    <>
      <header class="flex py-4 shadow-sm bg-white h-32">
        <div class="container flex items-center justify-between">
          <a href="index.html">
            <img
              src="https://img.freepik.com/free-vector/furniture-logo_23-2148613625.jpg?w=740&t=st=1670919607~exp=1670920207~hmac=459481d738b51b045afba4cb953468c6d79c718cc7570becdba55551e5c43a37"
              alt="Logo"
              class="w-32"
            />
          </a>

          <div class="w-full max-w-xl relative flex">
            <span class="absolute left-4 top-3 text-lg text-gray-400">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              name="search"
              id="search"
              class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
              placeholder="Search"
            />
            <button class="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
              Search
            </button>
          </div>

          <div class="flex items-center space-x-4">
            <a href="##" class="text-center text-gray-700 hover:text-primary transition relative">
              <div class="text-2xl">
                <i class="fa-regular fa-heart"></i>
              </div>
              <div class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                8
              </div>
            </a>
            <a href="##" class="text-center text-gray-700 hover:text-primary transition relative">
              <div class="text-2xl">
                <i class="fa-solid fa-bag-shopping"></i>
              </div>
              <div class="text-xl leading-3">Cart</div>
              <div class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </a>
            <a href="##" class="text-center text-gray-700 hover:text-primary transition relative">
              <div class="text-2xl">
                <i class="fa-regular fa-user"></i>
              </div>
              <div class="text-xl leading-3">Account</div>
            </a>
          </div>
        </div>
      </header>
      <nav class="bg-gray-800">
        <div class="container flex">
          <div class="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
            <span class="text-white">
              <i class="fa-solid fa-bars"></i>
            </span>
            <span class="capitalize ml-2 text-white">All Categories</span>

            <div class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/sofa.svg" alt="sofa" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">Sofa</span>
              </a>
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/terrace.svg" alt="terrace" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">Terarce</span>
              </a>
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/bed.svg" alt="bed" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">Bed</span>
              </a>
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/office.svg" alt="office" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">office</span>
              </a>
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/outdoor-cafe.svg" alt="outdoor" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
              </a>
              <a href="##" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img src="../assets/images/icons/bed-2.svg" alt="Mattress" class="w-5 h-5 object-contain" />
                <span class="ml-6 text-gray-600 text-sm">Mattress</span>
              </a>
            </div>
          </div>

          <div class="flex items-center justify-between flex-grow pl-12">
            <div class="flex items-center space-x-6 capitalize">
              <a href="../index.html" class="text-gray-200 hover:text-white transition">
                Home
              </a>
              <a href="pages/shop.html" class="text-gray-200 hover:text-white transition">
                Shop
              </a>
              <a href="##" class="text-gray-200 hover:text-white transition">
                About us
              </a>
              <a href="##" class="text-gray-200 hover:text-white transition">
                Contact us
              </a>
            </div>
            {tokens ? (
              <button href="##" onClick={handleSignOut} class="text-gray-200 hover:text-white transition">
                Sign out
              </button>
            ) : (
              <button href="##" onClick={handleLogin} class="text-gray-200 hover:text-white transition">
                Sign in/Sign up
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
