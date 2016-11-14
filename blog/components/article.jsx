import React from 'react'
import { clearArticle, getArticleAction } from "../actions/index.js";
import { bindActionCreators } from "redux"
import CommentForm from "../components/commentForm.jsx"
import CommentList from "../components/commentList.jsx"

class Article extends React.Component{

    static contextTypes = {
        store : React.PropTypes.object,
        router: React.PropTypes.object
    };

    constructor(props, context){
        super(props, context);
        var store = this.context.store;
        this.state = store.getState().article;
    }

    componentDidMount(){
        const { store } = this.context;
        bindActionCreators( getArticleAction, store.dispatch )( this.props.params.id );
        this.unSubcribe = store.subscribe(()=>{
            this.setState( Object.assign({},store.getState().article) );
        })
    }

    componentWillUnmount(){
        const { store } = this.context;
        bindActionCreators( clearArticle, store.dispatch )( );
        this.unSubcribe();
    }

    render(){
        let { content,title,tags,cover, id, time, viewcount,category } = this.state.data;
        let  tag = "";
        if( typeof tags == "string" ){
            tag = tags.split(",").map((el,index)=>{
                return (<li key={index}> {el} </li>)
            })
        }
        return (<div className="article-container">
                    { !this.state.loading ?
                    <div>
                        <div className="article-header ">
                            <ul className="article-tags">
                                { tag }
                            </ul>
                            <h1>{ title }</h1>
                                <span> <img src="../images/list.svg"/> { category }</span>
                                <span> <img src="../images/time.svg"/> { time }</span>
                                <span> <img src="../images/eye.svg"/> { Math.abs(viewcount).toString() }</span>
                        </div>
                        <div className="article-content" dangerouslySetInnerHTML = { {__html: content } }></div>
                        <CommentForm aid={ id } />
                        <CommentList aid={ id } />
                    </div>
                    :
                    <div className="loading">
                        <img src="./images/loading.gif" alt=""/>
                    </div>
                    }
                </div>);
    }
}

module.exports = Article;

