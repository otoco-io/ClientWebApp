// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react';

// Smart Contract
import mainContract from '../SmartContracts/MainContract';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, accountBalance} = useMappedState(({accountState}) => accountState)
    const {availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    
    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickSendHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        mainContract.createSeries(availableName, "BWN", 1000000, {value: web3.toWei("0.1", "ether")}, function(error, result){
            if(error) alert("Something went wrong! Please Try Again Later!")
            else {
                dispatch({ type: "Close Welcome Board Loading" });
                dispatch({ type: "Push Tx", txID: result });
                dispatch({ type: "Welcome Board Go To Step N", N: "ok" });
                function polling() {
                    setTimeout(function(){
                        web3.eth.getTransactionReceipt(result, function(error, tx){
                            console.log("tx_info", tx);
                            if(!tx){
                                polling();
                            } else { 
                                web3.eth.getBlockNumber(function(error, blockNum){
                                    console.log("blockNum", blockNum)
                                    console.log("confirmed", blockNum - tx.blockNumber)
                                    if(blockNum - tx.blockNumber < 1){
                                        polling();
                                    } else {
                                        mainContract.getMySeries(function(error, result){
                                            console.log(result)
                                            if(result) dispatch({ type: "Set Own Company Contracts", ownSeriesContracts: result });
                                            if(error) alert("Something went wrong!!!!");
                                        })
                                    }
                                })

                            }
                            
                        })
                    }, 2000);
                }
                polling();
            }
            
        });
    }

    return (
        <div>
            <p className="normal-text">All it takes to activate <b>{availableName}</b> is to send <b>0.1 ETH</b> to OtoCorp from your connected wallet.</p>
            <p className="normal-text">Send <b>0.1 ETH</b> of total <b>{accountBalance} ETH</b> available</p>
            <p className="normal-text">Form Your Account: {currentAccount}</p>
            <p className="normal-text">To Address: <b>otocorp.eth</b></p>
            <p className="normal-text"><a href="#"><b>Terms of Service</b></a></p>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickSendHandler}>Send</Button>
            </p>
        </div>
    );
    
}