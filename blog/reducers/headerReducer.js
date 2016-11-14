/**
 * Created by kanglin on 2016/10/9.
 */

import * as Types from "../constants/ActionTypes"

const initState = {
    wechatShow: false,
    weiboShow:false
}

export default function header(state = initState, action){
    switch ( action.type ){
        case Types.headerShowWechat:
            return Object.assign({},state,{wechatShow:true});
        case Types.headerHideWechat:
            return Object.assign({},state,{wechatShow:false});
        case Types.headerShowWeibo:
            return Object.assign({},state,{weiboShow:true});
        case Types.headerHideWeibo:
            return Object.assign({},state,{weiboShow:false});
        default :
            return state;
    }
}