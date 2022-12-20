import { useContext } from 'react';
import { CartContext } from '~/contexts/CartContextProvider';

const useCartContext = () => {
  const [stateCart, dispatchCart] = useContext(CartContext);

  return [stateCart, dispatchCart];
};

export default useCartContext;
