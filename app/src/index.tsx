import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App/App';
// import { SocketContext, socket } from "./context/socket";
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}> */}
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    {/* </SocketContext.Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
