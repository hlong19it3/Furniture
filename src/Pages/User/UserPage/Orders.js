import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Image } from '~/components/Image';
import CustomAxios, { baseURL } from '~/config/api';
import { ModalDetail } from '~/components/ModalDetail';
import { AuthContext } from '~/contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import configFile from '~/config';
function Orders() {
  const [token, currentUser, setToken, setCurrentUser] = useContext(AuthContext);
  const nav = useNavigate();

  const [toggleModal, setToggleModal] = useState(false);

  const [detailOrder, setDetailOrder] = useState({});

  const [tabName, setTabName] = useState('Pending');
  const [orders, setOrders] = useState([]);
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const tabItems = [
    { title: 'Pending', onclick: () => setTabName('Pending'), badge: ordersPending.length },
    { title: 'Shipping', onclick: () => setTabName('Shipping'), badge: ordersShipping.length },
    { title: 'Delevired & Cancel', onclick: () => setTabName('Delevired & Cancel'), badge: ordersDelivered.length },
  ];
  useLayoutEffect(() => {
    const handleShowPendingOrders = async () => {
      try {
        const pendingOrders = await CustomAxios.get('/api/v1/orders/pending-orders', {
          headers: {
            'x-accesstoken': JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
        });
        if (pendingOrders.data.msg) {
          console.log(pendingOrders.data.msg);
          setOrders([]);
          setOrdersPending([]);
        } else {
          setOrders(pendingOrders.data);
          setOrdersPending(pendingOrders.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleShowShippingOrders = async () => {
      try {
        const shippingOrders = await CustomAxios.get('/api/v1/orders/shipping-orders', {
          headers: {
            'x-accesstoken': JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
        });
        if (shippingOrders.data.msg) {
          console.log(shippingOrders.data.msg);
          setOrders([]);
          setOrdersShipping([]);
        } else {
          setOrders(shippingOrders.data);
          setOrdersShipping(shippingOrders.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleShowDeliveredCancelOrders = async () => {
      try {
        const deliveredOrders = await CustomAxios.get('/api/v1/orders/delivered-cancel-orders', {
          headers: {
            'x-accesstoken': JSON.parse(localStorage.getItem('userInfo')).accessToken,
          },
        });
        if (deliveredOrders.data.msg) {
          setOrders([]);
          setOrdersDelivered([]);
          console.log(deliveredOrders.data.msg);
        } else {
          setOrders(deliveredOrders.data);
          setOrdersDelivered(deliveredOrders.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handle = async () => {
      if (tabName === tabItems[0].title) await handleShowPendingOrders();
      else if (tabName === tabItems[1].title) await handleShowShippingOrders();
      else if (tabName === tabItems[2].title) await handleShowDeliveredCancelOrders();
    };
    handle();
  }, [tabName]);

  const handleOrderDetail = async (orderId) => {
    try {
      const orderDetail = await CustomAxios.get(`/api/v1/orders/order-detail/${orderId}`, {
        headers: {
          'x-accesstoken': JSON.parse(localStorage.getItem('userInfo')).accessToken,
        },
      });
      console.log(orderDetail.data);
      setDetailOrder(orderDetail.data);
    } catch (error) {
      console.log(error);
    }
    setToggleModal(true);
  };
  const handleToggleModal = () => {
    setToggleModal(false);
    setDetailOrder();
  };
  const passToSignIn = () => {
    return nav(configFile.routes.signInUser);
  };
  return currentUser ? (
    <div className="container mb-5 w-full flex flex-col items-center">
      <div class="w-full flex justify-center  text-sm font-medium text-center text-gray-500  dark:text-gray-400 ">
        <div className="w-2/3 flex justify-around">
          {tabItems.map((tabItem, index) => (
            <button
              key={index}
              onClick={tabItem.onclick}
              className={
                tabItem.title === tabName
                  ? 'relative p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                  : 'relative p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }
            >
              {tabItem.title}
              {tabItem.badge !== undefined && tabItem.badge !== 0 ? (
                tabItem.title !== 'Delevired & Cancel' && (
                  <span className="inline-flex absolute top-3 right-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                    {tabItem.badge}
                  </span>
                )
              ) : (
                <></>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[600px] bg-slate-100 rounded-lg shadow-sm mt-3 overflow-y-auto text-base">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col py-4 items-center">
            {orders.length > 0 &&
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className="w-5/6 h-32 flex flex-col items-center border-2 border-slate-400 rounded-lg px-2 py-3 my-2"
                >
                  <div className="w-5/6 flex ">
                    <div className="font-bold  whitespace-nowrap">Shipping address:</div>
                    <div className="ml-2 text-ellipsis whitespace-nowrap  overflow-hidden">{order.shippingAddress}</div>
                  </div>
                  <div className="w-5/6 flex">
                    <div className="font-bold ">Phone number:</div>
                    <div className="ml-2 ">{order.User.phone}</div>
                  </div>
                  <div className="w-5/6 flex justify-center">
                    {/*<Image
                      src={baseURL + '/' + order.orderDetail[0].Product.imageUrl}
                      className="w-24 h-24 rounded-md"
                      alt="img-product"
                    />
                    <div className="flex-1 flex flex-col ml-3">
                      <div className="text-ellipsis whitespace-nowrap  overflow-hidden">
                        {order.orderDetail[0].Product.name}
                      </div>
                      <div className="">Quantity: {order.orderDetail[0].quantity}</div>
                    </div>*/}
                    <div className="flex">
                      <button onClick={() => handleOrderDetail(order.id)} className="underline font-bold text-lg">
                        Detail
                      </button>
                    </div>
                  </div>
                  {/* {order.orderDetail.length > 1 && ( */}
                  {/* <div className="w-5/6 flex justify-center items-center">
                    <div className=" font-bold text-lg">More...</div>
                  </div> */}
                  {/* )} */}
                </div>
              ))}
          </div>
        </div>
      </div>
      {toggleModal && <ModalDetail toggleModal={handleToggleModal} detail={detailOrder} from="user" />}
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

export default Orders;
