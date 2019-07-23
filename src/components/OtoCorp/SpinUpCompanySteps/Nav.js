import React from 'react'
import OtoCorpStep from '../UIComponents/Step'

export default ({stepNum}) => {

    return (
        <OtoCorpStep.Wrap pointing secondary vertical>
            <OtoCorpStep.Item active={stepNum === 0}>Check Name</OtoCorpStep.Item>
            <OtoCorpStep.Item active={stepNum === 1}>Connect Wallet</OtoCorpStep.Item>
            <OtoCorpStep.Item active={stepNum === 2}>Activate Company</OtoCorpStep.Item>
        </OtoCorpStep.Wrap>
    )
}