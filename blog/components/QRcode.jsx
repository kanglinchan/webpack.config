import React, { PropTypes } from "react"


class QRcode extends  React.Component{
    static propTypes = {
        rqPic: PropTypes.string.isRequired
    };
    render(){
        return(
            <div className="qrcode">
                <img src={this.props.rqPic } alt=""/>
            </div>
        )
    }
}

module .exports = QRcode;