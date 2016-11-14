import React ,{ Component } from "react";
import { connect } from "react-redux"


let notFound= ()=>{

        return (<div className ="notfound" >
                    <img src="../images/404.jpg" alt=""/>
                </div>);
};

export default notFound;

