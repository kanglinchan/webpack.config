import React from "react"
import { bindActionCreators } from "redux"
import { getSearchList } from "../actions/index.js"
import  ArticleList  from "./articleList.jsx"


class SearchArticle extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object,
        router: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.loadHandler = this.loadHandler.bind(this);
        const { store } = this.context;
        const { search } =  store.getState();
        this.state = search;
    }

    componentDidMount() {
        const { store } = this.context;
        let keyWord = this.props.routeParams.keyWord;
        this.unSubscribe = store.subscribe(()=> {
            this.setState(store.getState().search);
        });
        window.addEventListener("scroll", this.loadHandler, false);
    }

    componentWillUnmount() {
        console.dir(this.unSubscribe);
        this.unSubscribe();
        window.removeEventListener("scroll", this.loadHandler);
    }

    loadHandler() {
        if (!this.state.loading && !this.state.loadedAll) { //如果正在加载过程中就不应该触发加载
            let loader = document.getElementById("loader");
            let loaderTop = this.getTop(loader);//元素距离文档顶部的高度
            let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let height = document.documentElement.clientHeight;
            if (loaderTop < scrollTop + height) {
                let keyWord = this.props.routeParams.keyWord;
                let pageNumber = this.state.pageNumber + 1;
                bindActionCreators(getSearchList, this.context.store.dispatch)(keyWord, pageNumber);
            }
        }
    };

    getTop(e) {
        let top = 0;
        while (e) {
            top += e.offsetTop;
            e = e.offsetParent;
        }
        return top;
    }


    render() {

        let hide = this.state.loadedAll? "hide" : "";
        return (
            <div>
                {this.state.data.length ? <ArticleList data={this.state.data} loading={this.state.loading}/> : "" }
                <div className={`loading-data ${hide}`} id="loader">
                    正在加载...
                </div>
            </div>
        );
    }

}


module.exports =  SearchArticle;