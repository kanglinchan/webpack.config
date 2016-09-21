import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import Couter from "./Components/Counter"
import counter from './reducer'

const strore = createStore( counter )

const rootEl = document.getElementById("root");

const render = function(){
     ReactDOM.render(
        <counter
            value = {store.getState}
            onIncrement={ ()=>store.dispatch({type:"INCREMENT"}) }
            onDecrement={ ()=>store.dispatch({type:"DECREMENT"}) }
        />,
        rootEl
    )
}

render() //第一次

store.subcribe(render)//变化后