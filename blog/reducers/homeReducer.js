/**
 * Created by kanglin on 2016/10/31.
 */
import *as types from "../constants/ActionTypes"

const initState = {
    data:[],
    loading:false,
    pageNumber:1,
    loadedAll:false
};

export default function (state=initState, action) {
    switch ( action.type ){
        case types.homeListLoading:
            return Object.assign({}, state, {
                loading: action.loading,
                pageNumber:action.pageNumber
            });
        case types.homeListLoaded:
            return Object.assign({}, state, {
                loading:action.loading,
                data: state.data.concat( action.data ),
                pageNumber: state.pageNumber,
                loadedAll: action.loadedAll
            });
        default :
            return state;

    }
};