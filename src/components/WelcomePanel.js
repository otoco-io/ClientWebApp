// React
import React, { useState, useEffect } from 'react';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import CheckingNameBoard from './CheckingNameBoard'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Select } from 'semantic-ui-react'

// Static Sources
import img_metamask from '../images/metamask.svg'

async function getAccounts_MetaMask() {
    const accounts = await ethereum.enable();
    return accounts;
}

export default () => {
    
    const [state, setState] = useState({
        loading: false,
        accounts: null,
        currentAccount: null
    })
    const [stepNum, setStepNum] = useState(0)
    const [accountBalance, setAccountBalance] = useState('Loading...')
    const [mainContractAddr, setMainContractAddr] = useState('0x66526b32bd2d111a23b9a04a1045bf3c3d7db557')
    const [mainContractABI, setMainContractABI] = useState([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "seriesName",
                    "type": "string"
                },
                {
                    "name": "seriesSymbol",
                    "type": "string"
                },
                {
                    "name": "initTotalShares",
                    "type": "uint256"
                }
            ],
            "name": "createSeries",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMySeries",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "manager",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "series",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "series_of",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ])
    const [inputName, setInputName] = useState("")
    const [txID, setTxID] = useState("")
    const [seriesContractAddr, setSeriesContractAddr] = useState("")
    
    let mainContract = web3.eth.contract(mainContractABI).at(mainContractAddr)

    const clickHandler_Metamask = (e) => {
        e.target.style= {
            display: 'none'
        }
        setState({loading: true});
        getAccounts_MetaMask().then((accounts) => {
            setState({loading: false, accounts, currentAccount: accounts[0]});
            
            web3.eth.getBalance(accounts[0], function(error, result){
                setAccountBalance(result.toNumber() / 10**18);
            });
            
        }).catch(console.log);
    }

    const handleCreateOrg = (e) => {
        setState({loading: true, currentAccount: state.accounts[0]});
        mainContract.createSeries(inputName, "BWN", 1000000, {value: web3.toWei("0.1", "ether")}, function(error, result){
            if(error) console.log(error);
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
        });
    }

    const ConnectWalletBoard = () => {
        if(state.currentAccount) {
            return (
                <>
                <div>OtoCorp Main Contract Address: <h4>{mainContractAddr}</h4></div>
                <p>You have connected your account successfully!</p>
                <div>Current ETH Account: <h4>{state.currentAccount}</h4></div>
                <br/>
                <div>Account Balance: <h4>{accountBalance} ETH</h4> </div>
                <br/>
                <div style={{ display: (txID == "") ? 'none' : 'block' }}>
                    <b><span>TxID: {txID}</span></b>
                </div>
                <br/>
                <div style={{ display: (seriesContractAddr == "") ? 'none' : 'block' }}>
                    <b><span>Series Contract Address: {seriesContractAddr}</span></b>
                </div>
                <br/>
                <Button className="primary" animated='fade' onClick={handleCreateOrg}>
                    <Button.Content visible>Create new organization</Button.Content>
                    <Button.Content hidden>
                        <Icon name="plus" />
                    </Button.Content>
                </Button>
                </>
            );
        } else {
            return (
                <>
                <Message style= {{maxWidth: "500px", margin: "15px auto"}} success header='Congrats!' content="You can create an organization using this name." />
                <h1>First, connect your wallet: </h1>
                <Button style={{ display: (state.loading) ? 'none' : 'inline-block' }} className="animated-metamask primary" animated='fade' onClick={(e) => {clickHandler_Metamask(e)}}>
                    <Button.Content visible>MetaMask</Button.Content>
                    <Button.Content hidden>
                        <Image src={img_metamask} />
                    </Button.Content>
                </Button>
                </>
            );
        }
    }

    const ActionBoard = () => {
        switch (stepNum) {
            case 1: 
                return <ConnectWalletBoard />
            default:
                return <CheckingNameBoard setStepNum={setStepNum} setInputName={setInputName} />
        }
    }
    
    return (
        <div id="welcome-pnl">
            <div className="logo-container">
                <Logo />
            </div>
            <Container className="pnl-body">
                <Loader active={state.loading} />
                <div>
                    
                    <ActionBoard />
                </div>
            </Container>
        </div>
    )

}