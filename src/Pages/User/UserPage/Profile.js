import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/contexts/AuthContextProvider';
import CustomAxios from '~/config/api';
import configFile from '~/config';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const nav = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleUpdateInfo = async () => {
    try {
      const update = await CustomAxios.put(
        `/api/v1/users/update/${currentUser.id}`,
        {
          firstName,
          lastName,
          phone,
          address,
        },
        {
          headers: {
            'x-accesstoken': JSON.parse(token).accessToken,
          },
        },
      );
      setCurrentUser(update.data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  };
  const passToSignIn = () => {
    return nav(configFile.routes.signInUser);
  };
  return currentUser ? (
    <div className="w-full m-h-2/3 flex justify-center items-center p-5 text-base">
      <div className="flex flex-col flex-[0.8]">
        <div className="flex-1 flex justify-center items-center mb-3">
          <span className="text-3xl tracking-wider font-black">{currentUser.firstName}'s Profile</span>
        </div>
        <div className=" flex  justify-center">
          <div className="w-2/3 border-2 border-slate-300 rounded-lg ">
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center ">
                <label htmlFor="firstName" className="flex-[0.35] text-xl font-bold mr-6">
                  First Name:
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center">
                <label htmlFor="lastName" className="flex-[0.35] text-xl font-bold mr-6">
                  Last Name:
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center">
                <label htmlFor="phone" className="flex-[0.35] text-xl font-bold mr-6">
                  Address:
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="phone"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center">
                <label htmlFor="phone" className="flex-[0.35] text-xl font-bold mr-6">
                  Phone:
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center">
                <label htmlFor="email" className="flex-[0.35] text-xl font-bold mr-6">
                  Email:
                </label>
                <input
                  value={email}
                  id="email"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2 bg-slate-300"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-3">
          <button
            onClick={handleUpdateInfo}
            class="flex-[0.3] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-64 flex justify-center items-center p-5 text-base">
      <div className="flex flex-col flex-[0.8]">
        <div className="flex-1 flex justify-center items-center mt-3">
          <button
            onClick={passToSignIn}
            class="flex-[0.3] focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
