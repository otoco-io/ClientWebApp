import React, { useState } from 'react';

//Components
import Logo from './Logo'

import { Container, Button, Image, Loader, Icon } from 'semantic-ui-react'

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
                    <p>Get started by connecting one of the wallets below</p>

                    <ActionBoard />
                </div>
            </Container>
        </div>
    )

}