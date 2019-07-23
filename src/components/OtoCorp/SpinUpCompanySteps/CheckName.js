// React
import React, {useState} from 'react';

// Semantic UI for React
import { Input, Label, Button, Message } from 'semantic-ui-react'

import axios from 'axios';

export default ({setStepNum, setLoading, setInputName, inputName}) => { 

    const [checkResult, setCheckResult] = useState({})
    const [jurisdictionCode, setJurisdiction_code] = useState("us_de")
    const [canUseName, setCanUseName] = useState(false)
    const [hasResult, setHasResult] = useState(false)
    const [showAPIErr, setShowAPIErr] = useState(false)
    const [inputVal, setInputVal] = useState("")

    

    const clickCheckHandler = (e) => {
        /*// e.target.style.display = "none";

        setLoading(true);
        // let name_for_checking = document.getElementById("check_name").value;
        // let jurisdiction_code = document.getElementById("jurisdiction_code").value;
        console.log("checking.code", encodeURIComponent(jurisdictionCode));
        console.log("checking.name", encodeURIComponent(inputVal));

        
        axios.get(`https://api.opencorporates.com/v0.4.8/companies/search?q=${encodeURIComponent(inputVal)}&jurisdiction_code=${encodeURIComponent(jurisdictionCode)}`)
            .then(function({data}){
                setHasResult(true)
                setCheckResult({result: data.results.total_count > 0})
                setLoading(false);
            }).catch(function(){
                setHasResult(false);
                setShowAPIErr(true);
                setCanUseName(false);
                setLoading(false);
            });*/

        setCheckResult({result: false})

        
    }

    const clickNextHandler = (e) => {
        setStepNum(1);
    }

    const clickBackHandler = (e) => {
        setCheckResult({})
    }

    const CheckNameForm = () => (
        <div>
            <Input 
                type='text' 
                className="checkname-input-container" 
                labelPosition='right' 
                id="check_name" 
                placeholder='Search...' 
                action>
                <input className="placeholder" />
                <Label basic>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;LLC&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Delaware&nbsp;&nbsp;&nbsp;&nbsp;</Label>
            </Input>
            <Message negative style={{display: (checkResult.result) ? "" : "none"}}>
                <Message.Header>Sorry! This name has been uesd.</Message.Header>
                <p>Please Enter Another Company Name.</p>
            </Message>
            <Message negative style={{display: (showAPIErr) ? "" : "none"}}>
                <Message.Header>Sorry! Please try again later.</Message.Header>
                <p>Search API service is busy.</p>
            </Message>
            <p className="normal-text">Enter your company name exactly as you want it registered.</p>
            <p className="normal-text">Click `Check` to verify if your preferred name is available.</p>

            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCheckHandler}>Check</Button>
            </p>
        </div>
    )

    const AvailableResult = () => (
        <div>
            <p className="normal-text">Congrats! <b>{inputName}</b> is available for registration with Delaware State Registry.</p>
            <p className="normal-text"><b>{inputName}</b>  will have its registered address at: N Orange Street, Wilmington, DE 19801.</p>
            <p className="normal-text">Click `Next` to proceed or go `Back` to try a different name.</p>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickBackHandler}>Back</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickNextHandler}>Next</Button>
            </p>
        </div>
    )

    const CheckNamePanel = () => {
        switch (checkResult.result) {
            case false: 
                return <AvailableResult />
            default:
                return <CheckNameForm />
        }
    }

    return (
        <CheckNamePanel />
    );
    
}