/**
 * Created by kanglin on 2016/10/25.
 */
import *as Types   from "../constants/ActionTypes.js"

var initState = { loading:true, data:{} };

export default function article( state = initState, action ){
    switch (action.type){
        case Types.articleLoading :
            return Object.assign({}, initState );
        case Types.articleLoaded :
            return Object.assign({},state, { loading:false, data:action.data });
        case Types.articleClear:
            return Object.assign({}, initState);
        default:
        return state;
    }
}

