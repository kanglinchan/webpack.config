/**
 * Created by kanglin on 2016/10/28.
 */

import *as Types from "../constants/ActionTypes"


let initState = {
    loading:false,
    data:[],
    replyId:0,
    pageNumber:1,
    btnDisable:false,
    replyDone: false,
    loadedAll: false,
    totalMessage:{ flag:true, total:0 }
};
export default function commentList ( state = initState, action ) {
    switch ( action.type ){
        case Types.commentListLoading:
            return Object.assign( {}, state, { loading:true, replyDone:false } );
        case Types.commentListLoaded:
            console.dir( state.data.concat( action.data ) );
            return Object.assign( {}, state, {
                pageNumber:state.pageNumber+1,
                loading: false,
                loadedAll: action.loadedAll,
                data:state.data.concat( action.data )
            } );
        case Types.commentListOpenReply:
            return Object.assign( {}, state, { replyId: action.id } );
        case Types.commentListCloseReply:
            return Object.assign( {}, state, { replyId: 0 } );
        case Types.commentListReplying:
            return Object.assign( {}, state, action.payload );
        case Types.commentListReplied:
            return Object.assign( {}, state, action.payload,{data: state.data.concat( action.data ) } );
        case Types.commentListTotal:
            return Object.assign({}, state,{ totalMessage: action.message } );
        case Types.commentListClear:
            return Object.assign({}, initState);
        default:
            return state;
    }
}