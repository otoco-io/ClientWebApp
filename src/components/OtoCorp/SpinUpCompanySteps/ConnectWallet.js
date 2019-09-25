// React
import React from 'react';

// Redux Hook
import {useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react'
import img_metamask from '../../../images/metamask.svg'

// Smart Contract
import ERC20Contract from '../SmartContracts/ERC20Contract'
import MainContract from '../SmartContracts/MainContract';

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
                
                if(result) dispatch({ type: "Set Account ETH Balance", accountBalanceETH: result / 10**18 });
                if(error) console.log("Something went wrong! Please try again later!: ", error);
            });

            // Call balanceOf function
            ERC20Contract.getContract().methods.balanceOf(accounts[0]).call((error, balance) => {
                // console.log("balance: ", balance);
                // Get decimals
                ERC20Contract.getContract().methods.decimals().call((error, decimals) => {
                    // console.log("decimals: ", decimals);
                    // calculate a balance
                    dispatch({ type: "Close Welcome Board Loading" });
                    if(decimals) dispatch({ type: "Set Account ERC20 Balance", accountBalanceERC20: balance / 10**decimals});
                    if(error) console.log("Something went wrong! Please try again later!: ", error);
                    // balance = balance.div(10**decimals);
                    // console.log(decimals.toString());
                    MainContract.getContract().methods.seriesFee().call((error, seriesFee) => {
                        // get ERC20 Symbol
                        dispatch({ type: "Close Welcome Board Loading" });
                        if(seriesFee) dispatch({ type: "Set ERC20 Spin Up Fee", erc20SpinUpFee: seriesFee / 10**decimals});
                        if(error) console.log("Something went wrong! Please try again later!: ", error);
                    });
                });
            });

            // Get Symbol
            ERC20Contract.getContract().methods.symbol().call((error, symbol) => {
                // get ERC20 Symbol
                dispatch({ type: "Close Welcome Board Loading" });
                if(symbol) dispatch({ type: "Set ERC20 Symbol", erc20Symbol: web3.utils.hexToUtf8(symbol)});
                if(error) console.log("Something went wrong! Please try again later!: ", error);
            });

        }).catch((error) => {
            dispatch({ type: "Close Welcome Board Loading" });
            console.log("Something went wrong! Please try again later!: ", error)
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