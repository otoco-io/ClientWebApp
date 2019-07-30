// React
import React, {useEffect, createRef} from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Label, Button, Message } from 'semantic-ui-react'

import axios from 'axios';

export default () => { 

    const dispatch = useDispatch();
    const {inputCompanyName, focusInputCompanyName, availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);

    const inputRef = createRef();

    useEffect(() => {if(focusInputCompanyName) inputRef.current.focus()}, []);

    const closeLoading = () => {
        dispatch({type: 'Close Welcome Board Loading'});
    }

    const handleInputChange = (e) => {
        dispatch({type: 'Enter Company Name on Welcome Board', value: e.target.value})
    }

    const validate_input = () => {
        if(inputCompanyName === "") return false;
        return true;
    }

    const clickCheckHandler = (e) => {

        if(!validate_input()) {
            dispatch({
                type: 'Show Error Msg on Welcome Board', 
                title: "Company name is required!", 
                msg: "Please enter the company name you want to spin up."
            });
            return;
        }

        dispatch({type: 'Unfocus Input-CompanyName on Welcome Board'});
        dispatch({type: 'Open Welcome Board Loading'});
        dispatch({type: 'Hide Error Msg on Welcome Board'});

        setTimeout(function(){
            axios.get(`https://api.opencorporates.com/v0.4.8/companies/search?q=${encodeURIComponent(inputCompanyName + " LLC")}&jurisdiction_code=us_de`)
            .then(function({data}){

                if (data.results.total_count === 0) dispatch({type: 'Store Available Company Name'});
                else dispatch({type: 'Show Error Msg on Welcome Board', title: "Sorry! This name has been uesd.", msg: "Please Enter Another Company Name."});
                
                closeLoading();
                
            }).catch(function(resp){
                dispatch({type: 'Show Error Msg on Welcome Board', title: "Sorry, Please try again later.", msg: "Ooooops, Service is busy now."});
                closeLoading();
            });
            
        }, 2000)

    }

    const clickNextHandler = (e) => {
        if(availableName) dispatch({ type: "Welcome Board Go To Step N", N: 1 });
    }

    const clickBackHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const CheckNameForm = () => (
        <div>
            <div style={{minHeight: '200px'}}>
            <Input 
                type='text' 
                className="checkname-input-container" 
                labelPosition='right' 
                id="check_name" 
                placeholder='Search...' 
                ref={inputRef}
                value={inputCompanyName}
                onChange={handleInputChange}
                action>
                <input className="placeholder" />
                <Label basic>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;LLC&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Delaware&nbsp;&nbsp;&nbsp;&nbsp;</Label>
            </Input>
            <Message negative style={{display: "none"}}>
                <Message.Header>Sorry! This name has been uesd.</Message.Header>
                <p>Please Enter Another Company Name.</p>
            </Message>
            <Message negative style={{display: "none"}}>
                <Message.Header>Sorry! Please try again later.</Message.Header>
                <p>Search API service is busy.</p>
            </Message>
            <p className="normal-text">Enter your company name exactly as you want it registered.</p>
            <p className="normal-text">Click <b>`Check`</b> to verify if your preferred name is available.</p>
            </div>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCheckHandler}>Check</Button>
            </p>
        </div>
    )

    const AvailableResult = () => (
        <div>
            <div style={{minHeight: '200px'}}>
                <p className="normal-text">Congrats! <b>{availableName}</b> is available for registration with Delaware State Registry.</p>
                <p className="normal-text"><b>{availableName}</b>  will have its registered address at: <br/> <u>N Orange Street, Wilmington, DE 19801.</u></p>
                <p className="normal-text">Click `<b>Next</b>` to proceed or go `Back` to try a different name.</p>
            </div>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickBackHandler}>Back</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickNextHandler}>Next</Button>
            </p>
        </div>
    )

    const CheckNamePanel = () => {

        if(availableName === "") return <CheckNameForm />;

        return <AvailableResult />;
    }

    return (
        <CheckNamePanel />
    );
    
}