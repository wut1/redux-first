/**
 * Created by chex on 2016/6/23.
 */
export const HOTKEYWORD_RECEIVE_POSTS = "HOTKEYWORD_RECEIVE_POSTS"
export const QUESTIONS_REQUEST_POSTS = "QUESTIONS_REQUEST_POSTS"
export const QUESTIONS_RECEIVE_POSTS = "QUESTIONS_RECEIVE_POSTS"
export const QUESTIONS_REQUEST_FAIL = "QUESTIONS_REQUEST_FAIL"
export const PAGECHANGE = "PAGECHANGE"
export const SEARCH_TEXT = "SEARCH_TEXT"

function questionsRequsetPosts() {
    return {
        type:QUESTIONS_REQUEST_POSTS
    }
}

function questionsRequsetFail(mess) {
    return {
        type:QUESTIONS_REQUEST_FAIL,
        mess
    }
}

function questionsReceivePosts(data) {

    return {
        type:QUESTIONS_RECEIVE_POSTS,
        data
    }
}

function hotkeywordReceivePost(data){
    return {
        type:HOTKEYWORD_RECEIVE_POSTS,
        data
    }
}

export function searchText(text){
    return {
        type:SEARCH_TEXT,
        text
    }
}

export function pageChange(page_index){
    return {
        type:PAGECHANGE,
        current:page_index
    }
}

function sendPosts (url,data) {
    return dispatch => {
        data.currPage += 1;
        dispatch(questionsRequsetPosts())
        let promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(json) {
            if(json.resultCode == "0"){
                resolve(json);
            } else {
                reject("没有数据");
            }
           
        })
        .fail(function() {
           reject("网络请求失败");
        })
        });
        return promise.then(json => dispatch(questionsReceivePosts(json)),
            json => dispatch(questionsRequsetFail(json)))
    }
}
function sendPostsHot(url){
    return dispatch => {
         let promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
        })
        .done(function(json) {
            if(json.resultCode == "0"){
                resolve(json);
            } else {
                reject("没有数据");
            }       
        })
        .fail(function() {
           reject("error");
        })
        });
        return promise.then(json => dispatch(hotkeywordReceivePost(json)))
    }
}

export function sendPostsIfNeeded(url,data) {
    return (dispatch,getState) => {
        return dispatch(sendPosts(url,data))
    }
}

export function sendPostsHotKey(url) {
    return (dispatch,getState) => {
        return dispatch(sendPostsHot(url))
    }
}