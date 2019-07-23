// React
import React from 'react';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react'
import img_metamask from '../../../images/metamask.svg'

export default ({setStepNum}) => { 

    const clickMetaMaskHandler = (e) => {
        setStepNum(2);
    }

    const clickHandler_Metamask = (e) => {
        e.target.style= {
            display: 'none'
        }
        setState({loading: true});
        getAccounts_MetaMask().then((accounts) => {
            setState({loading: false, accounts, currentAccount: accounts[0]});
            console.log(accounts[0])
            web3.eth.getBalance(accounts[0], function(error, result){
                console.log(error)
                console.log(result)
                setAccountBalance(result.toNumber() / 10**18);
            });
            
        }).catch(console.log);
    }

    return (
        <div>
            <Button className="animated-metamask primary" animated='fade' onClick={(e) => {clickMetaMaskHandler(e)}}>
                <Button.Content visible>MetaMask</Button.Content>
                <Button.Content hidden>
                    <Image src={img_metamask} />
                </Button.Content>
            </Button>
        </div>
    );
    
}