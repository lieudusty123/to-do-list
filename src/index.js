import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './scripts/App';
import reportWebVitals from './reportWebVitals';
import { testStore } from './scripts/Store/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={testStore}>
    <App />
  </Provider>
);

reportWebVitals();
