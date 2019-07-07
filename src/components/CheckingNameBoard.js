// React
import React, { useState } from 'react';

// Other Libs
import axios from 'axios';

// UI Framework
import {Button, Message, Loader, Input, Select } from 'semantic-ui-react'

export default () => { 

    const [jurisdictionCode, setJurisdiction_code] = useState("us_de")
    const [inputValue, setInputValue] = useState("")
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
                setLoading(false);
            });
    }

    const options = [
        { key: 'Delaware', text: 'Delaware', value: 'us_de' },
        { key: 'Wyoming', text: 'Wyoming', value: 'us_wy' }
    ];

    return (
        <>
        <Loader active={loading} />
        <div style= {{display: (!hasResult)? "none" : "block"}}>
            <Message style= {{maxWidth: "500px", margin: "15px auto", display: (canUseName)? "none" : "block"}} error header='Sorry' content="This name has been uesd." />
            <Message style= {{maxWidth: "500px", margin: "15px auto", display: (!canUseName)? "none" : "block"}} success header='Congratulations' content="You can create an organization using this name." />
        </div>
        <Input type='text' id="check_name" placeholder='Search...' onChange={(e, {value}) => {setInputValue(value)}} action>
          <input className="placeholder" />
          <Select id="jurisdiction_code" onChange={(e, {value}) => {setJurisdiction_code(value)}} compact options={options} defaultValue='us_de' style={{minWidth: "100px", color: "#777777"}} />
          <Button type='submit' className="primary" disabled={loading} onClick={clickHandler_Search}>Check</Button>
        </Input>
        </>
    );
}