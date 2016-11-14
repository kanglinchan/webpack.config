import React, { Component } from "react"
import {IndexLink} from "react-router"

class About extends Component{
    render(){
        return (<div>
            <span>about</span>
            <IndexLink to="/" activeClassName="active">
                Home
            </IndexLink>
            {this.props.children}
        </div>)
    }
}


export default About;