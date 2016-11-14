import React from 'react'
import { render } from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers"
import {IndexRoute, Router, Route, hashHistory } from 'react-router';
import App from "./containers/App"
import About from "./components/About.jsx"
import Children from "./components/Children.jsx"
import Me from "./components/Me.jsx"
import Home from "./components/Home.jsx"
import SearchArticle from "./components/searchArticle.jsx"
import Article from "./components/article.jsx"
import CategoryListContainer from "./containers/categoryListContainer.js"
import NotFound from "./components/notFound.jsx"

const store = createStore(reducer,{},compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
function leaveHandler(){
    console.log("dddd");
}

function enterHandler( nextState, replaceState ){
    replaceState({ pathname: '/about' });
}


render(<Provider store={store}>
            <Router history={ hashHistory }>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>

                    <route path="searchArticle/:keyWord" component = { SearchArticle } />
                    <route path="article/:id" component = { Article } />
                    <route path="categoryList/:id" component={ CategoryListContainer }/>
                    <Route path="*" component={ NotFound } />
                </Route>
            </Router>
      </Provider>,
  document.getElementById('root'));