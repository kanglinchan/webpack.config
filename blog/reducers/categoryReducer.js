/**
 * Created by kanglin on 2016/10/16.
 */
import * as types from "../constants/ActionTypes.js"

const initSate = { loaded: false, data:[], open:true };
export default function(state=initSate, action){
    switch (action.type){
        case types.categoryLoading :
            return Object.assign({},state,{loaded: false, data:[]});
        case types.categoryLoaded :
            return Object.assign({}, state, {loaded:true, data:action.data });
        case types.categoryOpen :
            return Object.assign({}, state, { open: !state.open });
        default:
            return state;


    }
}