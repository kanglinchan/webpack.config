/**
 * Created by kanglin on 2016/11/12.
 */

import *as Types from "../constants/ActionTypes"

let initState = {
    data:[] ,loading:true, loadedAll:false, pageNumber:1
};

export default function categoryList(state=initState, action) {
    switch( action.type ){
        case  Types.categoryListLoading:
            return Object.assign({},state, action.payload);
        case Types.categoryListLoaded:
            return Object.assign({},state,action.payload, { data: state.data.concat(action.data) });
        case Types.categoryListReset:
            return Object.assign({}, initState);
        default:
            return state;
    }
}
