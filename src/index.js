// React
import React from 'react';
import ReactDOM from 'react-dom';

// Blockchain
import Web3Integrte from './web3-integrate'
const supported = Web3Integrte.init();

// Integrated Redux
import {StoreContext} from 'redux-react-hook';
import {store} from './Redux/store';

// Components
import App from './components/App';

// Style Sheets
import './stylesheets/index.less'
import 'semantic-ui-less/semantic.less'



if(supported){
  ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
  );
}




