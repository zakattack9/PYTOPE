import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.scss';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
