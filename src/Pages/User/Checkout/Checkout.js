import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import configFile from '~/config';
import { AuthContext } from '~/contexts/AuthContextProvider';

function Checkout() {
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);

  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <div class="max-w-lg flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <svg
          class="w-10 h-10 mb-2 text-amber-600 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clip-rule="evenodd"
          ></path>
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
        </svg>
        <div>
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-green-600 dark:text-white">
            Purchase Successfully!
          </h5>
        </div>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Thank you for your trust and support! {currentUser && currentUser.firstName + ' ' + currentUser.lastName}.
        </p>
        <Link
          to={configFile.routes.home}
          class="w-full flex py-3 rounded-lg justify-center items-center bg-slate-400 text-white"
        >
          Continue Shopping!
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
