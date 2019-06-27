import React from 'react';

//Components
import Logo from './Logo'

import { Container, Button, Image } from 'semantic-ui-react'

import img_metamask from '../images/metamask.svg'

export default () => {
    return (
        <div id="welcome-pnl">
            <div className="logo-container">
                <Logo />
            </div>
            <Container className="pnl-body">
                <h1>Welcome to Otocorp</h1>
                <p>Start here to spin up your real-world organization on blockchain</p>
                <p>Get started by connecting one of the wallets below</p>
                <Button className="animated-metamask" animated>
                    <Button.Content visible>MetaMask</Button.Content>
                    <Button.Content hidden>
                        <Image src={img_metamask} />
                    </Button.Content>
                </Button>
            </Container>
        </div>
    )
}