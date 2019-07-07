// React
import React, { useState } from 'react';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import CheckingNameBoard from './CheckingNameBoard'

// UI Framework
import { Container, Button, Image, Loader, Icon, Input, Select } from 'semantic-ui-react'

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


    const clickHandler_Metamask = (e) => {
        e.target.style= {
            display: 'none'
        }
        setState({loading: true});
        getAccounts_MetaMask().then((accounts) => {
            setState({loading: false, accounts, currentAccount: accounts[0]});
        }).catch(() => {
            setState({loading: false});
        });
    }

    const ActionBoard = () => {
        if(state.currentAccount) {
            return (
                <>
                <p>Current ETH Account: {state.currentAccount}</p>
                <Button className="primary" animated='fade'>
                    <Button.Content visible>Create new organization</Button.Content>
                    <Button.Content hidden>
                        <Icon name="plus" />
                    </Button.Content>
                </Button>
                </>
            );
        } else {
            return (
                <Button style={{ display: (state.loading) ? 'none' : 'inline-block' }} className="animated-metamask primary" animated='fade' onClick={(e) => {clickHandler_Metamask(e)}}>
                    <Button.Content visible>MetaMask</Button.Content>
                    <Button.Content hidden>
                        <Image src={img_metamask} />
                    </Button.Content>
                </Button>
            );
        }
    }

    const CheckingBoard = () => {
        if(state.currentAccount) {
            return (
                <>
                <h2>Awsome Name!! Now, You can create an organization using this name.</h2>
                <h3><b>{}</b></h3>
                <Button className="primary" animated='fade'>
                    <Button.Content visible>Create new organization</Button.Content>
                    <Button.Content hidden>
                        <Icon name="plus" />
                    </Button.Content>
                </Button>
                </>
            );
        } else {
            return (
                <CheckingNameBoard />
            );
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
                    <h1>Welcome to Otocorp</h1>
                    <p>Start here to spin up your real-world organization on blockchain</p>
                    <p>Get started by checking a company name you want to create.</p>
                    <CheckingNameBoard />
                </div>
            </Container>
        </div>
    )

}