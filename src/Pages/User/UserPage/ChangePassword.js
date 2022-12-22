import { useContext, useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { AuthContext } from '~/contexts/AuthContextProvider';
import CustomAxios from '~/config/api';
import configFile from '~/config';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function ChangePassword() {
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const nav = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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

  const handleChangePassword = async () => {
    if (newPassword === confirmNewPassword) {
      if (confirmNewPassword.length > 8) {
        try {
          const changePassword = await CustomAxios.put(
            '/api/v1/users/update-password',
            {
              currentPassword,
              newPassword,
            },
            {
              headers: {
                'x-accesstoken': JSON.parse(token).accessToken,
              },
            },
          );
          if (changePassword.status === 201) {
            toast.error(changePassword.data.msg, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              style: {
                fontSize: '16px',
              },
            });
          } else if (changePassword.status === 200) {
            toast.success(changePassword.data.msg, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              style: {
                fontSize: '16px',
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error('Password must be more than 8 words', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          style: {
            fontSize: '16px',
          },
        });
      }
    } else {
      toast.error("Confirm password doesn't match with new password", {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        style: {
          fontSize: '16px',
        },
      });
    }
  };
  const passToSignIn = () => {
    return nav(configFile.routes.signInUser);
  };
  return currentUser ? (
    <div className="w-full m-h-2/3 flex justify-center items-center p-5 text-base">
      <ToastContainer />
      <div className="flex flex-col flex-[0.8]">
        <div className="flex-1 flex justify-center items-center mb-3">
          <span className="text-3xl tracking-wider font-black">Change password</span>
        </div>
        <div className=" flex  justify-center">
          <div className="w-2/3 border-2 border-slate-300 rounded-lg ">
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center ">
                <label htmlFor="currentPassword" className="flex-[0.6] text-xl font-bold mr-6">
                  Current password:
                </label>
                <input
                  type={typeInput}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  id="currentPassword"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center">
                <label htmlFor="newPassword" className="flex-[0.6] text-xl font-bold mr-6">
                  New password:
                </label>
                <input
                  type={typeInput}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newPassword"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                />
              </div>
            </div>
            <div className=" p-2 flex justify-center items-center">
              <div className="flex-[0.7] flex items-center relative">
                <label htmlFor="confirmNewPassword" className="flex-[0.6] text-xl font-bold mr-6">
                  Confirm password:
                </label>
                <input
                  type={typeInput}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  id="confirmNewPassword"
                  className="flex-1 text-lg border-b-2 border-slate-600 outline-none px-3 py-2"
                  onFocus={() => setShowEye(true)}
                  onBlur={() => (confirmNewPassword ? setShowEye(true) : setShowEye(false))}
                />
                {showEye && (
                  <span
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
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
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-3">
          <button
            onClick={handleChangePassword}
            className="flex-[0.3] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Change password
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
            className="flex-[0.3] focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
