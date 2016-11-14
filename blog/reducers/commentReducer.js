/**
 * Created by kanglin on 2016/10/28.
 */
import *as types from "../constants/ActionTypes"

const initState = { disable:false,data:{} };
export default function comment( state=initState, action ){
    switch ( action.type ){
        case types.commentSubmitting:
            return Object.assign( {}, state, { disable: true, data:{} } );
        case types.commentSubmitted:
            return Object.assign({}, state, { disable: false ,data:action.data });
        case types.commentWillSubmit:
            return Object.assign( {},state, {disable:false,data:{}} );
        default:
            return state;
    }
}