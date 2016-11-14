import React from "react"
import { bindActionCreators } from "redux"
import { sentCommentAction, modalOpenAction, modalCloseAction, resetCommentState } from "../actions/index.js"

class CommentForm extends React.Component{

    static contextTypes = {
        store: React.PropTypes.object
    };

    constructor( props, context ){
        super(props,context);
        let { store } = this.context;
        this.state = store.getState().comment;

    }

    submitHandler(e){
        e.preventDefault();
        let store = this.context.store;
        let author = this.refs.author.value;
        let email = this.refs.email.value;
        let text = this.refs.text.value;
        let aid = this.refs.aid.value;
        if( ! /^\d+$/.test(aid) ){
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

        let param = "author="+author+"&email="+email+"&text="+text+"&aid="+aid;
        bindActionCreators( sentCommentAction, store.dispatch )(param);
    }

    componentDidMount(){
        let store = this.context.store;
        this.unSubscribe = store.subscribe(()=>{
            this.setState( Object.assign({},store.getState().comment ) );
        });
    }

    componentWillUnmount(){
        console.dir("remove listen 1");
        this.unSubscribe();
    }


    componentDidUpdate(){
        if( this.state.data.flag ){
            this.refs.author.value = "";
            this.refs.email.value = "";
            this.refs.text.value = "";
        }

        if( typeof this.state.data.flag != "undefined"){
            let store = this.context.store;

            bindActionCreators( modalOpenAction, store.dispatch )({
               body:this.state.data.message,
               title:"3秒后自动关闭...",
               button: "立即关闭"
            });
            window.setTimeout( bindActionCreators( modalCloseAction, store.dispatch  ) ,3000);
            //表单提交后重置组件初始状态
            bindActionCreators( resetCommentState, store.dispatch )();
        }
    }

    render(){
        let btnClass = "comment-btn";
        let btnValue = "发表评论";
        if( this.state.disable ) {
            btnClass = "comment-btn active";
            btnValue = "评论提交中";
        }



        return (

            <div className="article-comment-form clearfix">
                <form onSubmit={ this.submitHandler.bind(this) }>
                    <h2>发表评论</h2>
                    <ul>
                        <li>
                            <label htmlFor ="author">名称<span>*</span></label>
                            <input type="text" name="author" ref="author"  />
                        </li>
                        <li>
                            <label htmlFor="email">邮箱<span>*</span></label>
                            <input type="text"  name="email" ref="email" />
                        </li>
                    </ul>
                    <input type="hidden" ref="aid" value={ this.props.aid } />
                    <textarea ref="text" placeholder="写点什么吧..."/>
                    <input className={ btnClass } disabled={ this.state.disable } type="submit" value={btnValue} />
                </form>
            </div>
        );
    }
}


module.exports = CommentForm;