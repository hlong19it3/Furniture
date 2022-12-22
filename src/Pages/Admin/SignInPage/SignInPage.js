import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import CustomAxios from '~/config/api';
import './SignInPage.css';

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeInput, setTypeInput] = useState('password');
  const [loginStatus, setLoginStatus] = useState();

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showEye, setShowEye] = useState(false);

  useEffect(() => {
    if (showHidePassword === true) {
      setTypeInput('text');
    } else {
      setTypeInput('password');
    }
  }, [showHidePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CustomAxios.post('/api/v1/users/signin', {
      email,
      password,
    });
    if (res.status === 201) {
      setLoginStatus(res.data.msg);
    }
    if (res.status === 200) {
      CustomAxios.get('/api/v1/users/token', {
        headers: { 'x-accesstoken': res.data.tokens.accessToken },
      }).then((response) => {
        if (response.data.role === 2) {
          navigate('/admin');
          localStorage.setItem('userInfo', JSON.stringify(res.data.tokens));
          // console.log(res.data.tokens);
        } else if (response.data.role === 1) {
          navigate('/signin');
        }
      });
    }
  };

  return (
    <div id="background">
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="w-2/5 h-5/6 rounded-3xl bg-sky-500/[.08] shadow-lg p-7 flex flex-col justify-between items-center">
          <div>
            <h2>WELCOME ADMIN</h2>
          </div>
          <div className="w-3/4 flex-1 flex flex-col justify-evenly items-center">
            <div className="relative z-0 mb-6 w-full group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type={typeInput}
                name="floating_password"
                id="floating_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onFocus={() => setShowEye(true)}
                onBlur={() => (password ? setShowEye(true) : setShowEye(false))}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {showEye && (
                <span
                  className="cursor-pointer absolute right-0 top-1/3"
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
            <div className="w-3/4">
              <p>{loginStatus}</p>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600  dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
