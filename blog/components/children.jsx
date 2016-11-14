import React from "react"
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

class Children extends React.Component{


    componentDidMount(){
        const { store } = this.context;
        console.dir( store );
    }

    render(){
        const { isShow } = this.props;
        return(
            <div>
                <ReactCSSTransitionGroup 
                transitionEnterTimeout={100}
                transitionLeaveTimeout={100}
                transitionName="example">
                    { isShow? <div>ssssssssssss</div>:"" }
                </ReactCSSTransitionGroup>
                
            </div>
         )
    }
}

Children.contextTypes ={
    store : React.PropTypes.object
}


export default Children;

