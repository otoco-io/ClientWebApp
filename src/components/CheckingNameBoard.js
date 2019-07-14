// React
import React, { useState } from 'react';

// Other Libs
import axios from 'axios';

// UI Framework
import {Button, Message, Loader, Input, Label } from 'semantic-ui-react'

export default ({setStepNum}) => { 

    const [jurisdictionCode, setJurisdiction_code] = useState("us_de")
    const [inputValue, setInputValue] = useState("Brown LLC")
    const [loading, setLoading] = useState(false)
    const [canUseName, setCanUseName] = useState(false)
    const [hasResult, setHasResult] = useState(false)
    

    const clickHandler_Search = (e) => {
        // e.target.style.display = "none";

        setLoading(true);
        // let name_for_checking = document.getElementById("check_name").value;
        // let jurisdiction_code = document.getElementById("jurisdiction_code").value;
        console.log("checking.code", encodeURIComponent(jurisdictionCode));
        console.log("checking.name", encodeURIComponent(inputValue));

        
        axios.get(`https://api.opencorporates.com/v0.4.8/companies/search?q=${encodeURIComponent(inputValue)}&jurisdiction_code=${encodeURIComponent(jurisdictionCode)}`)
            .then(function({data}){
                setHasResult(true)
                setCanUseName(data.results.total_count == 0);
                // setLoading(false);
            }).catch(function(){
                setHasResult(false)
                setCanUseName(false);
                setLoading(false);
            });

        
    }

    React.useEffect(() => {
        if (canUseName) setStepNum(1);
    }, [canUseName]);

    
    return (
        <div style={{display: (canUseName)? "none" : "block"}}>
            <Loader active={loading} />
            <h1>Welcome to Otocorp</h1>
            <p>Start here to spin up your real-world organization on blockchain</p>
            <p>Get started by checking a company name you want to create.</p>
            <div style= {{display: (!hasResult)? "none" : "block"}}>
                <Message style= {{maxWidth: "500px", margin: "15px auto", display: (canUseName)? "none" : "block"}} error header='Sorry' content="This name has been uesd." />
            </div>
            <Input type='text' labelPosition='right' id="check_name" placeholder='Search...' onChange={(e, {value}) => {setInputValue(value)}} action>
                <input className="placeholder" />
                <Label basic>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;LLC&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Delaware&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                <Button id="btn-check-nmae" className="primary" disabled={loading} onClick={clickHandler_Search}>Check</Button>
            </Input>
        </div>
    );
    

    
}