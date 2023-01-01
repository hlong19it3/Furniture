import { useContext, useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { BsFillCreditCardFill, BsCashStack } from 'react-icons/bs';

import CustomAxios from '~/config/api';
import { AuthContext } from '~/contexts/AuthContextProvider';
import { Image } from '~/components/Image';
import useCartContext from '~/hooks/useCartContext';
import { deleteIntoCart, updateQuantity } from '~/reducers/cartReducer';
import configFile from '~/config';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
  const nav = useNavigate();
  const [stateCart, dispatchCart] = useCartContext();
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceSale, setPriceSale] = useState(0);
  const [discounted, setDiscounted] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(1);

  useEffect(() => {
    if (stateCart.length > 0) {
      let total = 0;
      stateCart.forEach((cart) => {
        total = total + cart.quantity * cart.currentPrice;
      });
      setTotalPrice(total);
      if (total >= 5000000) {
        setPriceSale((total * 10) / 100);
        total = total - (total * 10) / 100;
      } else {
        setPriceSale(0);
      }
      setDiscounted(total);
    } else {
      setTotalPrice(0);
      setDiscounted(0);
      setPriceSale(0);
    }
  }, [stateCart]);

  const handleDeleteItem = (index) => {
    dispatchCart(deleteIntoCart(index));
  };
  const handleQuantity = (type, index) => {
    dispatchCart(updateQuantity({ type, index }));
  };
  const handlePassToSignIn = () => {
    nav(configFile.routes.signInUser);
  };
  const handlePlaceOrder = async () => {
    if (shippingAddress) {
      let purchaseItem = [];
      stateCart.forEach((cart) => {
        purchaseItem.push({
          price_data: {
            id: cart.productId,
            name: cart.nameProduct,
            price: cart.currentPrice,
          },
          quantity: cart.quantity,
        });
      });
      if (paymentMethod === 1) {
        try {
          const purchase = await CustomAxios.post(
            '/api/v1/stripe/create-checkout-session',
            {
              discounted,
              purchaseItem,
              userOrder: currentUser.id,
              shippingAddress,
            },
            {
              headers: { 'x-accesstoken': JSON.parse(token).accessToken },
            },
          );
          localStorage.setItem('session', purchase.data.id);
          localStorage.setItem('shippingAddress', shippingAddress);
          localStorage.setItem('discounted', discounted);
          window.location.href = purchase.data.url;
        } catch (error) {}
      } else if (paymentMethod === 2) {
        try {
          const purchase = await CustomAxios.post(
            '/api/v1/stripe/check-session',
            {
              totalPrice: discounted,
              order: stateCart,
              shippingAddress,
              paymentMethodId: paymentMethod,
            },
            {
              headers: { 'x-accesstoken': JSON.parse(token).accessToken },
            },
          );
          if (purchase.status === 200) {
            localStorage.removeItem('cart');
            nav('/checkout-success');
          } else {
            toast.error('Server busy!', {
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
        } catch (error) {}
      }
    } else {
      toast.error('Please input your address!', {
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
  return (
    <div className="flex container py-5">
      <ToastContainer />
      <div className="w-3/5 flex flex-col h-cart overflow-auto">
        {stateCart.map((cart, index) => (
          <div
            key={cart.productId}
            className={
              index > 0
                ? '  border-t-2 border-slate-300 flex w-full h-36 py-2 justify-between px-3'
                : 'flex w-full h-36 my-2 justify-between px-3'
            }
          >
            <Image src={cart.imageUrl} className="w-36 rounded" alt={cart.nameProduct} />
            <div className="ml-2 flex-1 flex flex-col justify-around">
              <div className="text-2xl font-bold"> {cart.nameProduct}</div>
              <div className="text-lg font-semibold"> {cart.currentPrice.toLocaleString()} VND</div>
              <div className="flex text-xl border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <button
                  onClick={() => handleQuantity('down', index)}
                  className="h-8 w-8 flex items-center justify-center cursor-pointer select-none"
                >
                  -
                </button>
                <div class="h-8 w-8 text-base flex items-center justify-center">{cart.quantity}</div>
                <button
                  onClick={() => handleQuantity('up', index)}
                  className="h-8 w-8 flex items-center justify-center cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center h-full">
              <button
                onClick={() => handleDeleteItem(index)}
                className="w-10 h-10 flex justify-center items-center text-white text-xl font-bold  bg-red-500 rounded-2xl"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-2/5 flex flex-col px-5 py-2 text-base">
        <div className="text-2xl flex justify-center w-full mb-3">Info Order</div>
        {currentUser ? (
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center">
              <div className=" flex-[0.48] flex flex-col">
                <span className="bottom-0 left-0">Fisrt Name</span>
                <div className=" flex justify-around items-center p-2 border-2 rounded-2xl border-slate-600 mb-2">
                  <input value={currentUser.firstName} disabled className="flex-1 border-none outline-none px-3" />
                </div>
              </div>
              <div className="flex-[0.48] flex flex-col">
                <span className="bottom-0 left-0">Last Name</span>
                <div className=" flex justify-around items-center p-2 border-2 rounded-2xl border-slate-600  mb-2">
                  <input value={currentUser.lastName} disabled className="flex-1 border-none outline-none px-3" />
                </div>
              </div>
            </div>
            <div className=" flex flex-col">
              <span className="bottom-0 left-0">Phone Number</span>
              <div className=" flex justify-around items-center p-2 border-2 rounded-2xl border-slate-600  mb-2">
                <FaPhoneAlt className="text-2xl" />
                <input value={currentUser.phone} disabled className="flex-1 border-none outline-none px-3" />
              </div>
            </div>
            <div className=" flex flex-col">
              <span className="bottom-0 left-0">Email</span>
              <div className=" flex justify-around items-center p-2 border-2 rounded-2xl border-slate-600  mb-2">
                <IoMdMail className="text-2xl" />
                <input value={currentUser.email} disabled className="flex-1 border-none outline-none px-3" />
              </div>
            </div>
            <div className=" flex flex-col border-b pb-2">
              <span className="bottom-0 left-0">Shipping Address</span>
              <div className=" flex justify-around items-center p-2 border-2 rounded-2xl border-slate-600  mb-2">
                <MdLocationOn className="text-2xl" />
                <input
                  value={shippingAddress.detailAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="flex-1 border-none outline-none px-3"
                  placeholder="Shipping address"
                />
              </div>
            </div>
            <div className=" flex items-center justify-center py-2">
              <div className="w-4/5 flex items-center justify-between">
                <div
                  onClick={() => setPaymentMethod(1)}
                  className={
                    paymentMethod === 1
                      ? 'bg-slate-600 text-white flex-[0.4] flex items-center  cursor-pointer border-2 border-slate-400 py-3 px-2 rounded-lg '
                      : 'flex-[0.4] flex items-center  cursor-pointer border-2 border-slate-400 py-3 px-2 rounded-lg '
                  }
                >
                  <BsFillCreditCardFill className="w-8 h-8 mr-2" />
                  <label htmlFor="prepaid" className="flex-1 flex justify-center cursor-pointer">
                    Pay with card
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="payment"
                    id="prepaid"
                    value={1}
                    readOnly
                    checked={paymentMethod === 1}
                  />
                </div>
                <div
                  onClick={() => setPaymentMethod(2)}
                  className={
                    paymentMethod === 2
                      ? 'bg-slate-600 text-white flex-[0.4] flex items-center  cursor-pointer border-2 border-slate-400 py-3 px-2 rounded-lg '
                      : 'flex-[0.4] flex items-center  cursor-pointer border-2 border-slate-400 py-3 px-2 rounded-lg '
                  }
                >
                  <BsCashStack className="w-8 h-8 mr-2" />
                  <label htmlFor="postpaid" className="flex-1 flex justify-center cursor-pointer">
                    Cash
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="payment"
                    id="postpaid"
                    value={2}
                    readOnly
                    checked={paymentMethod === 2}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-[0.5] flex justify-center items-center ">
            <button
              onClick={handlePassToSignIn}
              className="flex-1 border-2 rounded-lg border-sky-400 py-3 text-xl hover:text-white hover:bg-sky-400 hover:border-white"
            >
              Sign in to continue
            </button>
          </div>
        )}
        <div className="flex flex-col p-3">
          <div className=" flex  text-2xl items-center justify-between">
            <div>Total:</div>
            <div>{totalPrice.toLocaleString()} VND</div>
          </div>
          <div className=" flex  text-2xl items-center justify-between">
            <div>Discount:</div>
            <div className="line-through">{priceSale.toLocaleString()} VND</div>
          </div>
          <div className=" flex  text-2xl items-center justify-between border-b pb-2">
            <div>Total after discount:</div>
            <div className="">{discounted.toLocaleString()} VND</div>
          </div>
          {currentUser && stateCart.length > 0 && (
            <div className="flex justify-center items-center mt-3">
              <button
                onClick={handlePlaceOrder}
                className="flex-1 border-2 rounded-lg border-slate-600 py-3 text-xl hover:text-white hover:bg-slate-600 hover:border-white"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
