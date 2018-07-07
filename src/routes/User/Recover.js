import React, { Component } from "react";

////////////////////////////////////////////////
import Search from './Forgout/search';
import Change from './Forgout/change';
import Validate from './Forgout/validate';
////////////////////////////////////////////////

class ForgoutPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            step: 1,
        }
        this.handleSetStep = this.handleSetStep.bind(this);
    }

    handleSetStep(step, id){
        this.setState({
            step,
            id
        })
    }

    render(){
        switch (this.state.step) {
            case 1:
                return (<Search setStep={this.handleSetStep} id={this.state.id}/>)
            case 2:
                return (<Validate setStep={this.handleSetStep} id={this.state.id}/>)
            case 3:
                return (<Change setStep={this.handleSetStep} id={this.state.id}/>)
            default:
                return (<span>Upps!</span>)
        }
    }
}

export default ForgoutPage;