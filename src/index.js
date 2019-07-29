// React
import React from 'react';
import ReactDOM from 'react-dom';

// Integrated Redux
import {StoreContext} from 'redux-react-hook';
import {store} from './Redux/store';

// Components
import App from './components/App';

// Blockchain
//import Web3Integrte from './web3-integrate'

// Style Sheets
import './stylesheets/index.less'
import 'semantic-ui-less/semantic.less'


// Web3Integrte.init();

ReactDOM.render(
  <StoreContext.Provider value={store}>
      <App />
  </StoreContext.Provider>,
  document.getElementById('app')
);




