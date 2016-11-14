import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import  { url } from "../url.js";

export function show(test){
    return {
        type:types.SHOW,
        test:"test"
    }
}

export function HeaderShowWechat(){
    return {
        type:types.headerShowWechat
    }
}

export function HeaderHideWechat(){
    return {
        type:types.headerHideWechat
    }
}

export function HeaderHideWeibo(){
    return {
        type:types.headerHideWeibo
    }
}

export function HeaderShowWeibo(){
    return {
        type:types.headerShowWeibo
    }
}

/*search*/
export function getSearchList(keyWord, pageNumber = 1){
    return function( dispatch ){
        dispatch({
            type:types.searchLoading,
            pageNumber:pageNumber
        });
     //   alert(keyWord);
        fetch(`${url}api/search/${keyWord}/${pageNumber}`)
            .then(response=>response.json())
            .then(data =>{
                dispatch({
                    type:types.searchLoaded,
                    data:data,
                    loadedAll: data.length < 5
                })
            })

    }
}


export function repeatGetSearch(keyWord, pageNumber){
    return (dispatch)=>{
        dispatch({
            type:types.searchLoading
        });
        fetch(`${url}api/search/${keyWord}/${pageNumber}`)
            .then(response=>response.json())
            .then(data =>{
                dispatch({
                    type:types.searchRepeatLoaded,
                    data:data,
                    loadedAll: data.length<5
                })
            })
    }
}

/*category*/
export function fetchCategory(){
    return function(dispatch){
        dispatch({
            type:types.categoryLoading
        });

        fetch(`${url}api/category`)
            .then(response=>response.json())
            .then(data=>{
                dispatch({
                    type:types.categoryLoaded,
                    data:data
                });
            })
    }
}

export function categoryOpen(){
    return {
        type:types.categoryOpen
    }
}

/*获取文章*/
export function getArticleAction(id){
    return function (dispatch){
        dispatch({
            type:types.articleLoading
        });
        fetch(`${url}api/article/${id}`)
            .then(response =>response.json() )
            .then(data => {
                dispatch({
                    type:types.articleLoaded,
                    data:data
                })
            })
    }
}


export function clearArticle(){
    return {
        type: types.articleClear
    }
}

/*提交評論*/
export function sentCommentAction( param ){
    return function( dispatch ){
        dispatch({
           type:types.commentSubmitting
        });
        fetch(`${url}api/submitcomment`,{
            method: "POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:param
        })
        .then( response=>response.json() )
        .then((data)=>{
            dispatch({
                type:types.commentSubmitted,
                data:data
            })
        })
    }
}

export function resetCommentState(){
    return{
        type:types.commentWillSubmit
    }
}


/*comment list*/
export function getCommentList( aid, pid = 1 ){
    return (dispatch)=>{
        dispatch( { type:types.commentListLoading } );
        fetch( `${url}api/getComment/${aid}/${pid}` )
            .then( response => response.json() )
            .then(data => {
                dispatch({
                    type:types.commentListLoaded,
                    data:data,
                    loadedAll:data.length <5
                });

            })
    }
}


export function initCommentList( aid, pid = 1 ){
    return (dispatch)=>{
        dispatch( { type:types.commentListClear } );

        fetch( `${url}api/getComment/${aid}/${pid}` )
        .then( response => response.json() )
        .then(data => {
            dispatch({
                type:types.commentListLoaded,
                data:data,
                loadedAll:data.length <5
            });

        })
    }

}


export function getCommentListTotal(aid){
    return (dispatch)=>{
        fetch(`${url}/api/getCommentTotal/${aid}`)
        .then(response=>response.json())
        .then(data=>{
            dispatch({
                type:types.commentListTotal,
                message:data
            })
        })
    }
}

export function commentListOpenReply( id ){
    return{
        type: types.commentListOpenReply,
        id: id
    }
}

export function commentListCloseReply( id ){
    return{
        type: types.commentListCloseReply,
        id: id
    }
}

export function CommentListReply( param ){
    return ( dispatch )=>{
        dispatch( {
            type:  types.commentListReplying,
            payload: { btnDisable: true }
        } );
        fetch( `${url}api/reply`,{
            method:"post",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:param
        } ).then( response => response.json() )
            .then(data=>{
                dispatch({
                    type:types.commentListReplied
                    ,payload: { btnDisable: false, replyDone :true }
                    , data: data.flag ? [ data.msg ] : []
                });
                console.dir( data.flag ? [ data.msg ] : [] );
            }).catch((e)=>{
            console.dir(e );
        })
    }
}


/*modal*/
export function modalOpenAction( modalParams ){
    return ( dispatch )=>{
        dispatch({
            type:types.modalOpen,
            modalData:modalParams
        });
    }
}

export function modalCloseAction(){
    return{
        type:types.modalClose
    }
}


/*comment list*/
export function getHomeList(pageNumber=1){
    return (dispatch)=>{
        dispatch({
            type:types.homeListLoading,
            loading: true,
            pageNumber:pageNumber
        });
        fetch(`${url}api/home/${pageNumber}`)
        .then(response=>response.json())
        .then(data=>{
            dispatch({
                type:types.homeListLoaded,
                data:data,
                loading: false,
                loadedAll: data.length <5

            })
        }).catch(e=>{

        })
    }
}


/*categoryList*/
export function getCategoryList( id, pageNumber=1 ){
    return (dispatch)=>{
        dispatch({
            type: types.categoryListLoading,
            payload:{
                loading:true
            }
        });
        fetch( `${url}api/categoryList/${id}/${pageNumber}` )
            .then(response=>response.json())
            .then(data=>{
                console.dir( pageNumber );
               dispatch({
                   type:types.categoryListLoaded,
                   payload:{
                      loading:false,
                      loadedAll: data.length <5,
                       pageNumber: pageNumber
                   },
                   data:data
               });
                console.dir( data );
            })
    }
}


export function CategoryListReset(){
    return {
        type: types.categoryListReset
    }
}
