import { createContext, useContext, useEffect, useReducer } from 'react';

import CustomAxios from '~/config/api';
import cartReducer, { clearCart, initCartState } from '~/reducers/cartReducer';
import { AuthContext } from './AuthContextProvider';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(cartReducer, initCartState);
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('session') && localStorage.getItem('userInfo')) {
      CustomAxios.post(
        '/api/v1/stripe/check-session',
        {
          order: stateCart,
          shippingAddress: localStorage.getItem('shippingAddress'),
          sessionId: localStorage.getItem('session'),
          totalPrice: localStorage.getItem('discounted'),
        },
        {
          headers: {
            'x-accesstoken': JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
        },
      ).then((res) => {
        if (res.data.msg) {
          dispatchCart(clearCart());
        }
      });
      
      localStorage.removeItem('session');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('discounted')
    }
  }, []);
  if (stateCart.length > 0) {
    localStorage.setItem('cart', JSON.stringify(stateCart));
  } else {
    localStorage.removeItem('cart');
  }
  return <CartContext.Provider value={[stateCart, dispatchCart]}>{children}</CartContext.Provider>;
};
export { CartContext };
export default CartContextProvider;
