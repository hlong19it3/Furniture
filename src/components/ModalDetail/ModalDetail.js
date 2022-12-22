import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import CustomAxios from '~/config/api';
import { baseURL } from '~/config/api';
import { Dialog } from '../Dialog';
import { Image } from '../Image';

function ModalDetail({ onCLickSubmit, toggleModal, detail }) {
  const [statusOrder, setStatusOrder] = useState('');
  const [confirm, setConfirm] = useState();
  const [dialogCancelOrder, setDialogCancelOrder] = useState();
  const handleColse = (dialog) => {
    if (dialog !== 'confirm') {
      if (statusOrder) {
        setConfirm(true);
      } else {
        toggleModal();
      }
    } else {
      toggleModal();
      setStatusOrder('');
    }
  };
  const handleUpdateStatusOrder = async () => {
    if (statusOrder) {
      try {
        await CustomAxios.put(`/api/v1/orders/order-status/${detail.order.id}`, {
          status: statusOrder,
        });
      } catch (error) {}
      toggleModal();
    }
  };
  const handleUpdateCancelOrder = async () => {
    try {
      await CustomAxios.put(`/api/v1/orders/cancel-status/${detail.order.id}`);
    } catch (error) {}
    toggleModal();
  };
  return ReactDOM.createPortal(
    <React.Fragment>
      {confirm && statusOrder && (
        <Dialog
          title={'Order Status!'}
          content={'Wanna change the order status ?'}
          confirm={handleUpdateStatusOrder}
          cancel={() => handleColse('confirm')}
        />
      )}
      {dialogCancelOrder && (
        <Dialog
          title={'Order Cancel!'}
          content={'Cancel the order ?'}
          confirm={handleUpdateCancelOrder}
          cancel={() => setDialogCancelOrder(false)}
        />
      )}
      <div className=" fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center overflow-hidden bg-slate-400 bg-opacity-50 py-5">
        <div className="w-3/4 h-full flex flex-col p-4 rounded-lg shadow bg-white">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Order Detail</div>
            <button
              onClick={() => handleColse('not')}
              className="w-8 h-8 flex justify-center items-center text-white text-sm font-bold  bg-red-500 rounded-2xl"
            >
              &times;
            </button>
          </div>
          <div className="flex my-3 border-b border-spacing-2 border-slate-400 overflow-y-auto">
            <div className="w-full overflow-auto ">
              <div className="flex w-full my-2 ">
                <div className="flex-[0.5] flex flex-col text-base">
                  <div className="text-2xl flex justify-center w-full mb-3 font-bold">Order Information</div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Shipping Address:</div>
                    <div className="flex-[0.7] ">{detail.order.shippingAddress}</div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Ship Status:</div>
                    {detail.order.status !== 'Delivered' && detail.order.cancelOrder === false ? (
                      <select
                        className={
                          statusOrder === 'Pending'
                            ? 'flex-[0.7] text-cyan-700 border-none outline-none'
                            : statusOrder === 'Shipping'
                            ? 'flex-[0.7] text-yellow-700 border-none outline-none'
                            : statusOrder === 'Delivered'
                            ? 'flex-[0.7] text-green-700 border-none outline-none'
                            : 'flex-[0.7] border-none outline-none'
                        }
                        defaultValue={detail.order.status}
                        onChange={(e) => setStatusOrder(e.target.value)}
                      >
                        <option className="text-cyan-700" value={'Pending'}>
                          Pending
                        </option>
                        <option className="text-orange-700" value={'Shipping'}>
                          Shipping
                        </option>
                        <option className="text-green-700" value={'Delivered'}>
                          Successful delivery
                        </option>
                      </select>
                    ) : detail.order.cancelOrder === false ? (
                      <div className="flex-[0.7] text-green-700 border-none outline-none"> Successful delivery</div>
                    ) : (
                      <div className="flex-[0.7] text-red-700 border-none outline-none"> ''</div>
                    )}
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Order Date:</div>
                    <div className="flex-[0.7]"> {detail.order.createdAt.slice(0, 10)}</div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Total Prices:</div>
                    <div className="flex-[0.7]"> {detail.payment.totalPrice.toLocaleString()} VND</div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Payment:</div>
                    <div className="flex-[0.7]"> {detail.payment.PaymentMethod.method}</div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold">Cancel Order:</div>
                    <div className={detail.order.cancelOrder === true ? 'flex-[0.7] text-red-700' : 'flex-[0.7]'}>
                      {' '}
                      {detail.order.cancelOrder === true ? 'CANCEL' : 'NO'}
                    </div>
                  </div>

                  <div className="text-2xl flex justify-center w-full mb-3 font-bold">Customer Information</div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold"> Full Name:</div>
                    <div className="flex-[0.7]">
                      {' '}
                      {detail.order.User.firstName} {detail.order.User.lastName}
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold"> Phone:</div>
                    <div className="flex-[0.7]"> {detail.order.User.phone}</div>
                  </div>
                  <div className="flex ">
                    <div className="flex-[0.3] font-semibold"> Email:</div>
                    <div className="flex-[0.7]"> {detail.order.User.email}</div>
                  </div>
                </div>
                <div className="flex-[0.5]  flex flex-col overflow-auto px-2">
                  {detail.orderDetail.map((product, index) => (
                    <div
                      key={index}
                      className={
                        index > 0
                          ? '  border-t border-slate-300 flex w-full h-24 py-2 justify-between '
                          : 'flex w-full h-24 my-2 justify-between '
                      }
                    >
                      <Image
                        src={baseURL + '/' + product.Product.imageUrl}
                        className="w-24 rounded-lg"
                        alt={product.Product.name}
                      />
                      <div className="ml-2 flex-1 flex flex-col justify-around">
                        <div className="text-lg font-bold"> {product.Product.name}</div>
                        <div className="text-lg font-semibold">
                          Price: {product.Product.salePrice.toLocaleString()} VND
                        </div>
                        <div className="flex text-xl">
                          <div class="text-base flex items-center justify-center">Quantity: {product.quantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {detail.order.status !== 'Delivered' && detail.order.cancelOrder === false && (
            <div className="flex items-center justify-around">
              <button
                onClick={handleUpdateStatusOrder}
                className="text-base text-green-700 border-2 border-green-700 flex-[0.3] rounded-2xl py-2 hover:text-white hover:bg-green-700 "
              >
                Update Order Status
              </button>
              <button
                onClick={() => setDialogCancelOrder(true)}
                className="text-base text-pink-200 border-2 border-red-700 bg-red-700 flex-[0.3] rounded-2xl py-2 hover:text-white hover:bg-red-900"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>,
    document.body,
  );
}

export default ModalDetail;
