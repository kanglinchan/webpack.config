import React, { PropTypes } from "react"
import { repeatGetSearch } from "../actions"
import { bindActionCreators } from  "redux"

class Search extends React.Component{
    static contextTypes = {
        router: React.PropTypes.object,
        store: React.PropTypes.object
    };


    searchHandler(e){
        let text = e.target.value.trim();
        if(e.keyCode === 13 && text!=''){
            const path = '/searchArticle/'+ text;
            this.context.router.replace(path);
            var store = this.context.store;
            bindActionCreators( repeatGetSearch , this.context.store.dispatch )(text);
        }
    }

    render(){

        return(
            <div className="block">
                <h4 className="title">
                    SEARCH ARTICLE
                </h4>
                <div className="content">
                    <input onKeyDown={ this.searchHandler.bind(this) } className="search-box" type="text" placeholder="hit enter "/>
                </div>
            </div>
        )
    }
}



module.exports = Search;

