import React,{ PropTypes } from "react"
import  ReactCSSTransitionGroup from "react-addons-css-transition-group"
import QRcode from "./QRcode.jsx"



class Header extends React.Component{
    mouseEnterHandler(){
        const{ dispatch } = this.context.store;
        dispatch({
            type:"HEADER_SHOW_WECHAT"
        })
    }

    render(){
        const { actions, header } = this.props;
        return(
            <div className="header">
                <a href="" className="brand">深山老林</a>
                <span className="description"> KangLin's network notes </span>
                <ul className="contact">
                    <li onMouseEnter={ actions.HeaderShowWechat }
                        onMouseLeave={ actions.HeaderHideWechat }>
                        <img src="./images/wechat.svg" alt=""/>
                        <ReactCSSTransitionGroup
                            transitionName="wechatConant"
                            component="div"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            {
                                header.wechatShow ? <QRcode rqPic="../images/wechatQRcode.png"/> : ""
                            }
                        </ReactCSSTransitionGroup>
                    </li>
                    <li onMouseEnter={ actions.HeaderShowWeibo }
                        onMouseLeave={ actions.HeaderHideWeibo }>
                        <img src="./images/weibo.svg" alt=""/>
                        <ReactCSSTransitionGroup
                            transitionName="wechatConant"
                            component="div"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            {
                                header.weiboShow ? <QRcode rqPic="../images/weiboQRcode.png"/> : ""
                            }
                        </ReactCSSTransitionGroup>
                    </li>
                    <li>联系</li>
                </ul>
            </div>
        )
    }
}

Header.contextTypes = {
    store: React.PropTypes.object
};


module .exports = Header;