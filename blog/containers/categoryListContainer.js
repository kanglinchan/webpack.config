/**
 * Created by kanglin on 2016/11/11.
 */
import React, { PropTypes } from "react";
import { connect } from  "react-redux";
import { bindActionCreators } from "redux";
import { getCategoryList, CategoryListReset } from "../actions"
//import CategoryList from "../components/CategoryList.jsx"
import ArticleList from "../components/articleList.jsx"

class CategoryListContainer extends React.Component{
    constructor( props ){
        super( props );
        this.loadHandler = this.loadHandler.bind(this);
    }

    componentDidMount(){
        let { params, getCategoryList } = this.props;
        getCategoryList( params.id ,1 );
        var loader = document.getElementById("loader");
        window.addEventListener("scroll",this.loadHandler,false);

    }

    loadHandler = function(){

        let { params, getCategoryList, categoryList } = this.props;
        if( !categoryList.loadedAll && !categoryList.loading ){
            let loader = document.getElementById('loader');
            let top = this.getTop(loader);
            if( top < document.documentElement.clientHeight + document.body.scrollTop  ){
                console.dir(categoryList.pageNumber);
                getCategoryList(  params.id, categoryList.pageNumber+1 );

            }
        }
    };

    componentWillUnmount(){
        window.removeEventListener("scroll",this.loadHandler);
    }

    componentWillUpdate(){
        console.dir( this );
    }

    componentWillReceiveProps(nextProps){
        let { params, getCategoryList,CategoryListReset } =this.props;
        let prevId = params.id;
        let nextId = nextProps.params.id;
        if( prevId != nextId ){
            CategoryListReset();
            getCategoryList( nextId, 1 );
        }
    }


    getTop( el ){
        var top = 0;
        while ( el ){
            top += el.offsetTop;
            el = el.offsetParent;
        }
        return top;

    }

    render(){
        let { data, loadedAll, loading } = this.props.categoryList;
        let hide = loadedAll ? "hide":'';
        return(
                <div>
                    { loading && !data.length ? <div className="loading-pic" ><img src="../images/loading.gif" alt=""/></div> : <ArticleList data={data } />}
                    <div className={`loading-data ${hide}`} id="loader">正在加载...</div>
                </div>
            );
    }

}

CategoryListContainer.PropTypes = {
    getCategoryList: React.PropTypes.func,
    categoryList: React.PropTypes.object,
    clearCategoryReset: React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        categoryList: state.categoryList
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getCategoryList : bindActionCreators( getCategoryList, dispatch ),
        CategoryListReset: bindActionCreators( CategoryListReset ,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);

