import { SHOW } from "../constants/ActionTypes"

const initState = {
    isShow: true,
    test:"dddddd"
}

export default function show(state=initState, action){
    if( action.type === SHOW ){
        return Object.assign({}, state, {isShow: !state.isShow, test: state.test +"ff" })
    }else{
        return state;
    }
}