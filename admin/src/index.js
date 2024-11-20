import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/globals.css';  // Your global CSS file

// If you are using React Router
import { BrowserRouter as Router } from 'react-router-dom';

// Render the application inside the 'root' element
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
