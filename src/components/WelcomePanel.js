// React
import React, { useState, useEffect } from 'react';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import Step_ActivateCompany from './OtoCorp/SpinUpCompanySteps/ActivateCompany'
import Step_ConnectWallet from './OtoCorp/SpinUpCompanySteps/ConnectWallet'
import Step_CheckName from './OtoCorp/SpinUpCompanySteps/CheckName'
import Step_Nav from './OtoCorp/SpinUpCompanySteps/Nav'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

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
    const [mainContractAddr, setMainContractAddr] = useState('0xfea4ee9eb7791d915884891aa8682adfa56f6787')
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
    const [loading, setLoading] = useState(false)
    
    let mainContract = web3.eth.contract(mainContractABI).at(mainContractAddr)

    const ConfirmationView = () => (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Confirmation</h1>
                <p className="subtitle">Your company <b>XXX LLC</b> was validly formed! You can find proof of its existence here:</p>
                <p className="subtitle">[ether scan link]</p>
            </div>
            <h2></h2>
            
        </div>
    )

    const StepBoard = () => {
        switch (stepNum) {
            case 1: 
                return <Step_ConnectWallet setStepNum={setStepNum} setAccountBalance={setAccountBalance} />
            case 2: 
                return <Step_ActivateCompany setStepNum={setStepNum} accountBalance={accountBalance} mainContract={mainContract} />
            default:
                return (
                    <Step_CheckName 
                        setStepNum={setStepNum} 
                        setInputName={setInputName} 
                        setLoading={setLoading} 
                        inputName={inputName} 
                    />
                ) 
        }
    }

    return (
        <div id="welcome-pnl">
            <div className="logo-container">
                <Logo />
            </div>
            <Container className="pnl-body">
                <Loader active={loading} />
                <div style={{display: (stepNum === "ok" ? "none" : "")}}>
                    <div style={{textAlign: "left", marginBottom: "100px"}}>
                        <h1 className="title">Welcome to Otocorp</h1>
                        <p className="subtitle">Instantly spin up your real-world Delaware LLC here.</p>
                    </div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4} style={{textAlign: "right"}}>

                                <Step_Nav stepNum={stepNum} />

                            </Grid.Column>
                            <Grid.Column width={7} style={{textAlign: "left"}}>

                                <StepBoard /> 

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>

                <div style={{display: (stepNum !== "ok" ? "none" : "")}}>
                    <ConfirmationView seriesContractAddr={seriesContractAddr} />
                </div>
                
            </Container>
        </div>
    )

}