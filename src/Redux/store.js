import {createStore, combineReducers} from 'redux';
import {
    welcomePanelReducer, 
    accountReducer,
    txsReducer
} from './reducers';

const reducers = combineReducers({
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer
})

export const store  = createStore(reducers);