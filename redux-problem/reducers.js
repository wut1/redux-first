/**
 * Created by chex on 2016/6/23.
 */
import { combineReducers } from 'redux'
import {
    HOTKEYWORD_RECEIVE_POSTS,
    QUESTIONS_REQUEST_POSTS,
    QUESTIONS_RECEIVE_POSTS,
    QUESTIONS_REQUEST_FAIL,
    SEARCH_TEXT,
    PAGECHANGE
} from "./actions"


function posts(state = {
    isFetching:false,
    init:true,
    list:[],
    fail:""
},action) {
    switch (action.type){
        case PAGECHANGE:
            return Object.assign({},state,{
                init:false,
                current:action.current
            })
        case SEARCH_TEXT:
            return Object.assign({},state,{
                init:true,
                current:0,
                text:action.text
            })
        case QUESTIONS_REQUEST_POSTS:
            return Object.assign({},state,{
                isFetching:true,
                list:[]
            })
        case QUESTIONS_RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                total:parseInt(action.data.totenum),
                list: action.data.data[0].list
            })
        case QUESTIONS_REQUEST_FAIL:
            return Object.assign({}, state, {
                fail:action.mess
            })
        default:
            return state
    }
}

function postsByQuestions(state = {},action) {
    switch (action.type){
        case PAGECHANGE:
        case SEARCH_TEXT:
        case QUESTIONS_REQUEST_POSTS:
        case QUESTIONS_RECEIVE_POSTS:
        case QUESTIONS_REQUEST_FAIL:
            return Object.assign({},state,{
                questions:posts(state.questions,action)
            })
        default:
            return state;
    }
}

function postsByHot(state = {
    "list":[]
},action) {
    switch (action.type){
        case HOTKEYWORD_RECEIVE_POSTS:
            return Object.assign({},state,{
                list:action.data.data[0].list
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsByQuestions,
    postsByHot
})

export default rootReducer