// React
import React from 'react';

// Redux Hook
import {useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react'
import img_metamask from '../../../images/metamask.svg'

export default ({setStepNum}) => { 

    const getAccounts_MetaMask = async () => {
        const accounts = await ethereum.enable();
        return accounts;
    }

    const dispatch = useDispatch();

    const clickMetaMaskHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        getAccounts_MetaMask().then((accounts) => {
            
            dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
            web3.eth.getBalance(accounts[0], function(error, result){
                dispatch({ type: "Welcome Board Go To Step N", N: 2 });
                dispatch({ type: "Close Welcome Board Loading" });
                if(result) dispatch({ type: "Set Account Balance", accountBalance: result.toNumber() / 10**18 });
                if(error) alert("Sorry! We can not get the balance of your wallet!");
            });
        }).catch(() => {
            dispatch({ type: "Close Welcome Board Loading" });
            alert("Something went wrong! Please try again later!")
        });
    }

    return (
        <div>
            <Button className="animated-metamask primary" animated='fade' onClick={clickMetaMaskHandler}>
                <Button.Content visible>MetaMask</Button.Content>
                <Button.Content hidden>
                    <Image src={img_metamask} />
                </Button.Content>
            </Button>
        </div>
    );
    
}