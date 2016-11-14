/**
 * Created by kanglin on 2016/11/10.
 */
import React, { PropTypes } from 'react'
import { connect } from "react-redux"
import {bindActionCreators } from "redux"
import { fetchCategory } from "../actions/index"
import  Category  from "../components/category.jsx"



let CategoryContainer = ({category, fetchCategory } )=>{

    return (<Category category={category} fetchCategory={fetchCategory}/>);
};

CategoryContainer.PropTypes = {
    category: React.PropTypes.object,
    fetchCategory: React.PropTypes.func
};

function mapStateToProps( state ){
    return{
        category: state.category
    }
}

function mapDispatchToProps( dispatch ){
    return {
        fetchCategory: bindActionCreators( fetchCategory, dispatch )

    }
}

export default connect( mapStateToProps, mapDispatchToProps )(CategoryContainer);
