/**
 * Created by kanglin on 2016/10/26.
 */
import *as types from "../constants/ActionTypes.js"

let initState = { active: false, modalData:{} };

export default function modal(state = initState, action ){
    switch ( action.type ){
        case types.modalOpen:
            return Object.assign({}, state, { active:true, modalData:action.modalData });
        case types.modalClose:
            return Object.assign({}, state, { active: false, modalData:{} });
        default:
            return state;
    }
}