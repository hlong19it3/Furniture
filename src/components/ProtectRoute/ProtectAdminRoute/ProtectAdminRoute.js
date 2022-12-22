import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ProtectAdminRoute({ user, token, children }) {
  const nav = useNavigate();
  useEffect(() => {
    if (token === undefined) {
      nav('/admin/signin');
    } else {
      if (user) {
        if (user.role === 1 || user === undefined) {
          nav('/signin');
        }else{

          nav('/admin');
        }
      }
    }
    // eslint-disable-next-line
  }, [token, user]);

  return children;
}
export default ProtectAdminRoute;
