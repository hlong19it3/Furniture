import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';
import './index.css';
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import FilterContextProvider from './contexts/FilterContextProvider';
import CartContextProvider from './contexts/CartContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <FilterContextProvider>
      <CartContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartContextProvider>
    </FilterContextProvider>
  </AuthContextProvider>,
);
// eslint-disable-next-line
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
