import React from 'react';
import ReactDOM from 'react-dom';
function Dialog({ title, content, cancel, confirm }) {
  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="fixed top-0 left-0 z-[51] w-screen h-screen flex justify-center items-center">
        <div className="flex-[0.25] h-40 p-3 bg-white rounded-lg shadow  border-2 border-slate-500">
          <div className="flex flex-col justify-between ">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-base my-2  font-bold">{content}</div>
            <div className="text-base flex justify-around items-center">
              <button
                onClick={confirm}
                className="flex text-white justify-center items-center bg-green-700 flex-[0.3] rounded-2xl py-2"
              >
                Confirm
              </button>
              <button
                onClick={cancel}
                className="flex text-white justify-center items-center bg-red-700 flex-[0.3] rounded-2xl py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body,
  );
}

export default Dialog;
