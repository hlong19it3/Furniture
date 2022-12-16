import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import FilterContextProvider from './contexts/FilterContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
// eslint-disable-next-line
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
