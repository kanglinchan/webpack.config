import React from "react"
import { modalCloseAction } from "../actions"
import { bindActionCreators } from "redux"


export default class Modal extends React.Component{

    static contextTypes = {
        store: React.PropTypes.object
    };

    constructor(props, context ){
        super( props, context );
        let store = this.context.store;
        this.state = store.getState().modal;
    }

    switchHandler(){
        let store = this.context.store;
        bindActionCreators( modalCloseAction, store.dispatch )();
    }

    componentDidMount(){
        let store = this.context.store;
        this.state = store.getState().modal;
        store.subscribe(()=>{
            this.setState( store.getState().modal );
        });
        this.state.active && alert("open");
    }


    render(){
        let active = this.state.active;

        if( active ){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }

        let title = this.state.modalData.title || "信息提示";
        let body  = this.state.modalData.body ||  "内容提示";
        let button = this.state.modalData.button || "确认";

        return(
            active &&
            <div className="modal">
                <div className="dialog-wrap">
                    <div className="dialog-header">
                        <i className="close" onClick={ this.switchHandler.bind(this) } />
                        <h1>{ title }</h1>
                    </div>
                    <div className="dialog-body">
                        { body }
                    </div>
                    <div className="dialog-footer">
                        <button onClick={ this.switchHandler.bind(this) } >{ button }</button>
                    </div>
                </div>
            </div> );
    }
}