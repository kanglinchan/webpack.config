import { combineReducers } from "redux"
import  show    from "./show.js"
import header   from "./headerReducer.js"
import search   from "./searchReducer.js";
import category from "./categoryReducer.js"
import article  from "./articleReducer.js"
import modal    from "./modalReducer.js"
import comment from "./commentReducer.js"
import commentList from "./commentListReducer.js"
import home from "./homeReducer"
import categoryList from  "./categoryListReducer"

const rootReducer = combineReducers( {
    show,
    header,
    search,
    category,
    article,
    modal,
    comment,
    commentList,
    home,
    categoryList
});

export default rootReducer;