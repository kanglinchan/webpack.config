/**
 * Created by kanglin on 2016/10/16.
 */
import { searchLoading, searchLoaded , searchRepeatLoaded} from "../constants/ActionTypes";

const initState = {
    loading:true,
    data : [] ,
    pageNumber:1,
    loadedAll:false
};

export default function search(state = initState, action){
    switch (action.type){
        case searchRepeatLoaded:
            return Object.assign({},state,{
                loading:false,
                data:action.data,
                loadedAll:action.loadedAll
            });
        case searchLoading :
            return Object.assign( {},state, {
                loading:true,
                pageNumber:action.pageNumber

            });
        case searchLoaded :
            return Object.assign({},state,{
                loading:false,
                data:state.data.concat( action.data ),
                loadedAll:action.loadedAll

            });
        default:
            return state;

    }
}