const ADD_TO_CART = 'add-to-cart';
const UPDATE_QUANTITY = 'update-quantity';
const DELETE_INTO_CART = 'delete-into-cart';
const CLEAR_CART = 'clear-cart';

let initCartState = [];
if (localStorage.getItem('cart')) {
  initCartState = JSON.parse(localStorage.getItem('cart'));
}

const addToCart = (payload) => {
  return { type: ADD_TO_CART, payload };
};
const updateQuantity = (payload) => {
  return { type: UPDATE_QUANTITY, payload };
};
const deleteIntoCart = (payload) => {
  return { type: DELETE_INTO_CART, payload };
};
const clearCart = () => {
  return { type: CLEAR_CART, payload: [] };
};
const cartReducer = (state, action) => {
  let newCart = [...state];
  switch (action.type) {
    case ADD_TO_CART:
      let itemInCart = newCart.find((item) => action.payload.productId === item.productId);

      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action.payload.quantity;
      } else {
        itemInCart = {
          ...action.payload,
        };
        newCart.push(itemInCart);
      }
      break;
    case UPDATE_QUANTITY:
      if (action.payload.type === 'up') {
        newCart[action.payload.index].quantity++;
      } else {
        if (newCart[action.payload.index].quantity > 1) {
          newCart[action.payload.index].quantity--;
        }
      }
      break;
    case CLEAR_CART:
      newCart = action.payload;
      break;
    case DELETE_INTO_CART:
      newCart.splice(parseInt(action.payload), 1);
      break;
    default:
      break;
  }

  return newCart;
};

export { initCartState, addToCart, updateQuantity, deleteIntoCart, clearCart };
export default cartReducer;
