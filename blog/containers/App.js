import React from "react"
import ReaactDOM from "react-dom"
import { connect } from "react-redux"
import {bindActionCreators} from "redux"
import { Link } from "react-router"
import * as action from "../actions"
import Header from "../components/header.jsx"
import LeftSide from "../components/leftSide.jsx"
import Modal from "../components/modal.jsx"

require("../style/css/normalize.css");
require("../style/less/style.less");



class App extends React.Component{
    render(){
       // console.dir( this.props );
        return (

            <div className="app-container">
                <Header actions={this.props.actions} header={this.props.header}/>
                <LeftSide />
                <div className="right-side">
                    { this.props.children && React.cloneElement(this.props.children) }
                </div>
                <Modal/>
            </div>
            )
    }
}


App.contextTypes = {
  store: React.PropTypes.object
};

App.propTypes = {
  header:   React.PropTypes.object.isRequired,
  search:   React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};



function mapStateToProps(state){
    return {
        header: state.header,
        search : state.search,
        category:state.category
    }
}




function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators( action, dispatch)
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App);