import CustomAxios from '~/config/api';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  // console.log(currentUser);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setToken(localStorage.getItem('userInfo'));
    }

    const getCurrentUser = () => {
      CustomAxios.get('/api/v1/users/token', {
        headers: { 'x-accesstoken': JSON.parse(token).accessToken },
      }).then((res) => {
        setCurrentUser(res.data);
      });
    };

    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return <AuthContext.Provider value={[token, currentUser, setToken, setCurrentUser]}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
