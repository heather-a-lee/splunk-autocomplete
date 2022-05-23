import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SplunkThemeProvider } from '@splunk/themes';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SplunkThemeProvider family="prisma" colorScheme="light" density="comfortable">
      <App />
    </SplunkThemeProvider>
  </React.StrictMode>
, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
