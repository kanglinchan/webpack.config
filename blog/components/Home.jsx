
import React,{ Component, PropTypes } from "react"
import { Link } from "react-router"
import  ArticleList  from "./articleList.jsx"
import { bindActionCreators } from  "redux";
import { getHomeList } from "../actions/index"

class Home extends Component{
    static contextTypes = {
        store: PropTypes.object
    };

    constructor(props, context){
        super( props, context );
        let store = this.context.store;
        this.state =  store.getState().home ;
        this.loadHandler = this.loadHandler.bind( this );
    };

    componentDidMount(){
        let { store } = this.context;
        this.unSubscribe = store.subscribe(()=> {
            this.setState(store.getState().home);
        });
        bindActionCreators(getHomeList, store.dispatch )( this.state.pageNumber );
        window.addEventListener( "scroll", this.loadHandler, false);
    }

    componentWillUnmount(){
        this.unSubscribe();
        window.removeEventListener("scroll", this.loadHandler);
    }

    loadHandler(){
        if( !this.state.loading && !this.state.loadedAll ){ //如果正在加载过程中就不应该触发加载
            let loader = document.getElementById("loader");
            let loaderTop = this.getTop( loader );//元素距离文档顶部的高度
            let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let height = document.documentElement.clientHeight;
            if( loaderTop < scrollTop + height ){
                bindActionCreators( getHomeList, this.context.store.dispatch )( this.state.pageNumber+1 );
            }
        }
    };

    getTop(e){
        let top = 0;
        while (e){
            top += e.offsetTop;
            e = e.offsetParent;
        }
        return top;
    }

    render(){
        let hide = this.state.loadedAll ? "hide":"";
        return (<div>
                    {this.state.data.length? <ArticleList data={this.state.data} loading = {this.state.loading} />:"" }
                    <div className={`loading-data ${hide}`} id="loader" >
                       "正在加载..."
                    </div>
                </div>)
    }
}

export default Home