// React
import React from 'react';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react'

export default ({setStepNum}) => { 

    const clickCancelHandler = (e) => {
        setStepNum(0);
    }

    const clickSendHandler = (e) => {
        setStepNum("ok");
    }

    const handleCreateOrg = (e) => {
        setState({loading: true, currentAccount: state.accounts[0]});
        mainContract.createSeries(inputName, "BWN", 1000000, {value: web3.toWei("0.1", "ether")}, function(error, result){
            if(error) console.log(error);
            else {
                setState({loading: false, currentAccount: state.accounts[0]});
                setTxID(result);
                setSeriesContractAddr("Waiting for Contract Created....")
                function polling() {
                    setTimeout(function(){
                        web3.eth.getTransactionReceipt(result, function(error, result){
                            console.log("tx_info", result);
                            if(!result){
                                polling();
                            } else {
                                mainContract.getMySeries(function(error, result){
                                    console.log(result[result.length-1])
                                    setSeriesContractAddr(result[result.length-1])
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
            <p className="normal-text">All it takes to activate <b>XXXX LLC</b> is to send <b>XX ETH</b> to OtoCorp from your connected wallet.</p>
            <p className="normal-text">Send <b>XX ETH</b> of total <b>XX.XXX ETH</b> available</p>
            <p className="normal-text">To Address: <b>otocorp.eth</b></p>
            <p className="normal-text"><a href="#"><b>Terms of Service</b></a></p>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickSendHandler}>Send</Button>
            </p>
        </div>
    );
    
}