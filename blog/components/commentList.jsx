import React from "react"
import { bindActionCreators } from "redux"
import {initCommentList, getCommentListTotal, CommentListReply, modalOpenAction, getCommentList, commentListOpenReply, commentListCloseReply } from "../actions/index.js"



class Reply extends React.Component{
    static contextTypes = {
        store: React.PropTypes.object
    };
    constructor(props, context){
        super( props, context );
        this.state = this.context.store.getState().commentList;
    }


    componentDidMount(){
        let store = this.context.store;

        this.unsubscribe = store.subscribe( ()=>{
            this.setState(  store.getState().commentList );
        } );
    };

    componentDidUpdate(){
        if( this.state.replyDone ){
            this.refs.author.value = "";
            this.refs.email.value ="";
            this.refs.text.value ="";
            this.refs.pid.value = "";
            bindActionCreators( commentListCloseReply, this.context.store.dispatch )( this.props.aid );
        }
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    submitHandler(e){
        e.preventDefault();
        let author = this.refs.author.value;
        let email = this.refs.email.value;
        let text = this.refs.text.value;
        let pid = this.refs.pid.value;

        let store = this.context.store;

        if( ! /^\d+$/.test(pid) ){
            bindActionCreators( modalOpenAction, store.dispatch )({
                title:"錯誤信息",
                body:"文章id错误！"
            });
            return;
        }

        if( ! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( email ) ){
            bindActionCreators( modalOpenAction, store.dispatch )({
                title:"錯誤信息",
                body:"电子邮件格式错误！"
            });
            return;
        }
        if( !/^[\u4e00-\u9fff\w]{3,17}$/.test( author ) ){
            bindActionCreators( modalOpenAction, store.dispatch )({
                title:"錯誤信息",
                body:"用户名格式错误，请重新输入！"
            });
            return;
        }
        if(!/^[\u4e00-\u9fff\s\S]{10,200}$/.test( text )){
            bindActionCreators( modalOpenAction, store.dispatch )({
                title:"錯誤信息",
                body:"评论数为10-200字符！"
            });
            return;
        }
        text = "@"+this.props.author+": "+text;
        let param = "author="+author+"&email="+email+"&text="+text+"&pid="+pid;
        bindActionCreators( CommentListReply, store.dispatch )( param );
    }
    render(){

        console.dir(this.state);
        let active = this.state.btnDisable? "active" :"";
        return(
            <div className="reply-box">
                <form onSubmit={ this.submitHandler.bind(this) }>
                    <div className="reply-user">回复: <span>{ this.props.author }</span> </div>
                    <div className="reply-header" >
                        <div>
                            <label> 名称:</label>
                            <input type="text" id="author1" ref="author" />
                        </div>
                        <div>
                            <label htmlFor="email1">邮件:</label>
                            <input type="text" id="email1" ref="email" />
                        </div>
                    </div>
                    <input type="hidden" value={this.props.pid } ref="pid" />
                    <textarea className="reply-body" ref="text" />
                    <div className="reply-footer clearfix">
                        <button className={ `reply-submit ${active}` } disabled={ this.state.btnDisable } >提交</button>
                    </div>
                </form>
            </div>
        );
    }
}



export default class CommentList extends React.Component{

    static contextTypes = {
        store : React.PropTypes.object
    };

    constructor( props, context ){
        super( props, context );
        let store = this.context.store;
        this.state =   store.getState().commentList ;
        //将bind(this)标记起来，在unmount阶段remove
        this.loadHandler = this.loadHandler.bind(this);

    }

    componentDidMount(){
        let store  = this.context.store;
        bindActionCreators( initCommentList, this.context.store.dispatch )( this.props.aid );
        bindActionCreators( getCommentListTotal, this.context.store.dispatch )( this.props.aid );
        this.unSubscribe = store.subscribe( ()=>{
            this.setState(  store.getState().commentList );
        } );
        window.addEventListener("scroll", this.loadHandler , false);
    }

    componentWillUnmount(){
        //不要在这里重新bind(this);这是两个函数
        window.removeEventListener("scroll", this.loadHandler );
        this.unSubscribe();
    }

    loadHandler(){

        if( !this.state.loading && !this.state.loadedAll  ){
            let store  = this.context.store;
            let loader = document.getElementById("comment-list-loader");
            let top = this.getTop( loader );
            if( top <  document.body.scrollTop + document.documentElement.clientHeight ){
                bindActionCreators( getCommentList, store.dispatch )( this.props.aid, this.state.pageNumber );
            }
        }


    };

    getTop( el ){
        var top = 0;
        while (el){
            top += el.offsetTop;
            el = el.offsetParent;
        }
        return top;
    }

    replyHandler(e){
        bindActionCreators( commentListOpenReply, this.context.store.dispatch )( e );
    }
    replyCancel(){
        bindActionCreators( commentListCloseReply, this.context.store.dispatch )();
    }

    render(){
        let data = this.state.data;
        let total = this.state.totalMessage.total;
        let list = data.map( (item, index, array)=>{
            if( item.parent_id == 0 ){
                let children = [];
                array.forEach( (e, index, array)=>{
                    if(e.parent_id == item.id ){
                        children.push( e );
                    }
                } );

                return (
                    <li key={ index } className="list-item">
                        <div className="user-info">
                            <span>{ item.author }</span>
                            <span>{ item.time }</span>
                        </div>
                        <div className="content">
                            { item.content }
                        </div>
                        <div className="reply clearfix">
                            {
                                item.id == this.state.replyId ?
                                <a onClick={ this.replyCancel.bind(this, item.id ) }>取消</a>
                                :
                                 <a onClick={ this.replyHandler.bind(this, item.id ) }>回复</a>
                            }
                        </div>
                        { item.id == this.state.replyId ? <Reply pid={ item.id }  author ={item.author}  />:"" }
                        {
                            children.length ?
                            <ul className="child-list-item">
                                {   children.map((child, key) => {
                                        return (
                                            <li key={ key } >
                                                <div className="user-info">
                                                    <span>{ child.author }</span>
                                                    <span>{ child.time }</span>
                                                </div>
                                                <div className="content">
                                                    { child.content }
                                                </div>
                                                <div className="reply clearfix">
                                                    {
                                                        child.id == this.state.replyId ?
                                                            <a onClick={ this.replyCancel.bind(this) }>取消</a>
                                                            :
                                                            <a onClick={ this.replyHandler.bind(this, child.id ) }>回复</a>
                                                    }
                                                </div>
                                                { child.id == this.state.replyId ? <Reply aid={ this.props.aid } pid = { child.id } author ={child.author}  />:""}
                                            </li>
                                        )
                                    })
                                }
                        </ul> :""
                        }
                    </li>
                );
            }
        } );

        return (<div className="comment-list-container">
                    <div className="list-header">
                        <h2>全部评论 <span>{total}条</span> </h2>
                    </div>
                    <ul className="list-body">
                        { list }
                    </ul>
                    <div className="loading-data" id="comment-list-loader">
                        { this.state.loadedAll ? "没有评论了！" : "正在加载···" }
                    </div>
                </div>);
    }
}
