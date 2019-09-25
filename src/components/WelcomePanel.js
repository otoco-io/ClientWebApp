// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import Step_ActivateCompany from './OtoCorp/SpinUpCompanySteps/ActivateCompany'
import Step_ApprovePayment from './OtoCorp/SpinUpCompanySteps/ApprovePayment'
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
    const {loading, currentStep, errMsg, availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts} = useMappedState(({accountState}) => accountState);
    
    const ConfirmationView = () => (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Confirmation</h1>
                <p className="subtitle">Your company <b>{availableName}</b> was validly formed! You can find proof of its existence here:</p>
                <div className="subtitle">
                    Transaction ID: <b>{(txs[0]) ? txs[0].id : ""}</b>
                    <div style={{marginTop: '10px'}}>
                        (<a href={`https://kovan.etherscan.io/tx/${(txs[0]) ? txs[0].id : ""}`} 
                            target="_blank">View Transaction on Etherscan
                        </a>)
                    </div>
                </div>
                <div className="subtitle" style={{marginTop: '20px'}}>
                    Your Company Contract Address: <b>{(ownSeriesContracts.length > 0) ? ownSeriesContracts[ownSeriesContracts.length - 1] : "(Tx Pending... Please wait...)"}</b>
                    <div style={{marginTop: '10px', display: (ownSeriesContracts.length > 0) ? '' : 'none'}}>
                        (<a href={`https://kovan.etherscan.io/address/${ownSeriesContracts[ownSeriesContracts.length - 1]}`} 
                            target="_blank">View Contract on Etherscan
                        </a>)
                    </div>
                </div>
            </div>
            <h2></h2>
            
        </div>
    )

    const StepBoard = () => {
        switch (currentStep) {
            case 1: 
                return <Step_ConnectWallet />
            case 2: 
                return <Step_ApprovePayment />
            case 3: 
                return <Step_ActivateCompany />
            default:
                return (
                    <Step_CheckName />
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
                <div style={{display: (currentStep === "ok" ? "none" : "")}}>
                    <div style={{textAlign: "left", marginBottom: "100px"}}>
                        <h1 className="title">Welcome to Otocorp</h1>
                        <p className="subtitle">Instantly spin up your real-world Delaware LLC here.</p>
                    </div>
                    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4} style={{textAlign: "right"}}>

                                <Step_Nav stepNum={currentStep} />

                            </Grid.Column>
                            <Grid.Column width={7} style={{textAlign: "left", minHeight: '280px', }}>
                                <Message negative style={{display: (errMsg.show) ? "" : "none"}}>
                                    <Message.Header>{errMsg.title}</Message.Header>
                                    <p>{errMsg.content}</p>
                                </Message>
                                
                                <StepBoard /> 

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>

                <div style={{display: (currentStep !== "ok" ? "none" : "")}}>
                    <ConfirmationView />
                </div>
                
            </Container>
        </div>
    )

}