import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    {/* <React.StrictMode> */}
      <App/>
    {/* </React.StrictMode> */}
  </div>
);

reportWebVitals();
