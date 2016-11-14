import React, { Component } from "react"


class Me extends React.Component{
    constructor(props){
        super(props);
        console.dir( this.props.params);
    }
    render(){
        return(<div>me</div>)
    }
}
export default Me;