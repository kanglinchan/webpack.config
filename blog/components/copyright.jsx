import React from  "react"

class Copyright extends React.Component{
    render(){
        return(
            <div className="block">
                <h4 className="title">
                    COPYRIGHT
                </h4>
                <div className="content">
                    <p className="copyright">
                        Copyright © 2016 深山老林
                    </p>
                </div>
            </div>
        )
    }
}

module.exports = Copyright;