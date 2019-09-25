// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';
import ERC20Contract from '../SmartContracts/ERC20Contract';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, accountBalanceERC20, erc20Symbol, erc20SpinUpFee} = useMappedState(({accountState}) => accountState)
    const {availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    
    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickApproveHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        
        MainContract.getContract().methods.seriesFee().call((error, SpinUpFee) => {
            ERC20Contract.getContract().methods.approve(MainContract.getContract().options.address, SpinUpFee).send({from: currentAccount},(error, result) => {
                dispatch({ type: "Close Welcome Board Loading" });
    
                if(result) {
                    dispatch({ type: "Push Tx", txID: result });
                    dispatch({ type: "Welcome Board Go To Step N", N: 3 });
                }
                
                if(error) console.log("Something went wrong!", error);
                
            });
        });
    }

    return (
        <div>
            <div style={{minHeight: '200px'}}>
            <p className="normal-text">All it takes to activate <b>{availableName}</b> is to send <b>{erc20SpinUpFee} {erc20Symbol}</b> to OtoCorp from your connected wallet.</p>
            <p className="normal-text">Approve <b>{erc20SpinUpFee} {erc20Symbol}</b> of total <b>{accountBalanceERC20} {erc20Symbol}</b> available</p>
            <p className="normal-text">Form Your Account: {currentAccount}</p>
            <p className="normal-text">To Address: <b>otocorp.eth</b></p>
            <p className="normal-text"><a href="#"><b>Terms of Service</b></a></p>
            </div>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickApproveHandler}>Approve</Button>
            </p>
        </div>
    );
    
}