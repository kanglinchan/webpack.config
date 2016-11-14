import React,{PropTypes} from "react"
import {Link} from "react-router"
import Search from "./Search.jsx"
import Category from  "./category.jsx"
import Copyright from "./copyright.jsx"
import CategoryContainer from "../containers/categoryContainer"

class LeftSide extends React.Component{
    render(){
        return(
            <div className="left-side">
                <Search />
                <CategoryContainer/>
                <Copyright />

            </div>
        )
    }
}

module.exports = LeftSide;