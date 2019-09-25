import welcomePanelState from './WelcomePanelState'
import accountState from './AccountState'
import txsState, {tx} from './TxsState'


export const welcomePanelReducer = function(state = welcomePanelState, action){
    switch(action.type){
        case "Close Welcome Board":
            return Object.assign({}, state, {showBoard: false})
        case "Open Welcome Board Loading":
            return Object.assign({}, state, {loading: true})
        case "Close Welcome Board Loading":
            return Object.assign({}, state, {loading: false})
        case "Welcome Board Go To Step N":
            return Object.assign({}, state, {currentStep: action.N})
        case "Enter Company Name on Welcome Board":
            return Object.assign({}, state, {
                inputCompanyName: action.value, 
                focusInputCompanyName: true
            });
        case "Unfocus Input-CompanyName on Welcome Board":
            return Object.assign({}, state, {
                focusInputCompanyName: false
            });
        case "Store Available Company Name":
            return Object.assign({}, state, {
                availableName: state.inputCompanyName + " LLC",
            });    
        case "Show Error Msg on Welcome Board":
            return Object.assign({}, state, {
                errMsg: {
                    show: true,
                    title: action.title,
                    msg: action.msg
                }
            });
        case "Hide Error Msg on Welcome Board":
            return Object.assign({}, state, {
                errMsg: {
                    show: false,
                    title: "",
                    msg: ""
                }
            });
        case "Resume Welcome Board":
            return welcomePanelState;
        default:
            return state;
    }
}

export const accountReducer = function(state = accountState, action){
    switch(action.type){
        case "Set Current Account":
            return Object.assign({}, state, {
                currentAccount: action.currentAccount
            });
        case "Set Account ETH Balance":
            return Object.assign({}, state, {
                accountBalanceETH: action.accountBalanceETH
            });
        case "Set Account ERC20 Balance":
            return Object.assign({}, state, {
                accountBalanceERC20: action.accountBalanceERC20
            });
        case "Set ERC20 Symbol":
            return Object.assign({}, state, {
                erc20Symbol: action.erc20Symbol
            });
        case "Set ERC20 Spin Up Fee":
            return Object.assign({}, state, {
                erc20SpinUpFee: action.erc20SpinUpFee
            });
        case "Set Own Company Contracts":
            return Object.assign({}, state, {
                ownSeriesContracts: action.ownSeriesContracts
            });
        default:
            return state;

    }
}

export const txsReducer = function(state = txsState, action){
    switch(action.type){
        case "Push Tx":
            tx.id = action.txID;
            return Object.assign({}, state, {
                txs: [...state.txs, tx]
            });
        default:
            return state;

    }
}