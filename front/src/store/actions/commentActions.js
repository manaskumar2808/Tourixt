import * as actionTypes from './actionTypes';

import axios from '../../axios-comment';

export const fetchFeedComments = (feedId) => {
    return dispatch => {
        axios.get(`${feedId}/comments/`)
        .then(response => {
            dispatch(setFeedComments(response.data));
        }).catch(error => {
            dispatch(commentFetchFail(error));
        });
    }
}
export const fetchFeedLatestComments = (feedId) => {
    return dispatch => {
        axios.get(`${feedId}/comments/latest/`)
        .then(response => {
            dispatch(setFeedLatestComments(response.data));
        }).catch(error => {
            dispatch(commentFetchFail(error));
        });
    }
}


export const addComment = (comment) => {
    return dispatch => {
        const commentData = {
            text: comment.text,
            commentor: comment.commentor,
            feed: comment.feed,
            status: comment.status,
        }
        console.log(comment);
        axios.post(`create/`,commentData)
        .then(response => {
            dispatch(fetchFeedComments(comment.feed));
        }).catch(error => {
            dispatch(addCommentFail(error));
        });
    }
}


export const setFeedComments = (comments) => {
    const loadedComments = [];
    for(let key in comments){
        loadedComments.push({
            id: comments[key].id,
            text: comments[key].text,
            commentor: comments[key].commentor,
            feed: comments[key].feed,
            status: comments[key].status,
            timestamp: comments[key].timestamp,
        });
    }
    return {
        type: actionTypes.SET_FEED_COMMENTS,
        comments: loadedComments,
    }
}

export const setFeedLatestComments = (comments) => {
    const loadedComments = [];
    for(let key in comments){
        loadedComments.push({
            id: comments[key].id,
            text: comments[key].text,
            commentor: comments[key].commentor,
            feed: comments[key].feed,
            status: comments[key].status,
            timestamp: comments[key].timestamp,
        });
    }
    return {
        type: actionTypes.SET_FEED_LATEST_COMMENTS,
        latestComments: loadedComments,
    }
}


export const commentFetchFail = (error) => {
    return {
        type: actionTypes.COMMENT_FETCH_FAIL,
        error: error,
    }
}


export const addCommentSuccess = () => {

    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
    }
}


export const addCommentFail = (error) => {
    return {
        type: actionTypes.ADD_COMMENT_FAIL,
        error: error,
    }
}

export const fetchCommentReplies = (commentId) => {
    return dispatch => {
        axios.get(`${commentId}/replies/`)
        .then(response => {
            dispatch(setCommentReplies(response.data));
        }).catch(error => {
            dispatch(repliesFetchFail(error));
        });
    }
}
export const fetchCommentLatestReplies = (commentId) => {
    return dispatch => {
        axios.get(`${commentId}/replies/latest/`)
        .then(response => {
            dispatch(setCommentLatestReplies(response.data));
        }).catch(error => {
            dispatch(repliesFetchFail(error));
        });
    }
}


export const addReply = (reply) => {
    return dispatch => {
        const commentData = {
            text: reply.text,
            replier: reply.replier,
            comment: reply.comment,
        }
        axios.post(`reply/create/`,commentData)
        .then(response => {
            dispatch(fetchCommentReplies(reply.comment));
        }).catch(error => {
            dispatch(addReplyFail(error));
        });
    }
}


export const setCommentReplies = (replies) => {
    const loadedReplies = [];
    for(let key in replies){
        loadedReplies.push({
            id: replies[key].id,
            text: replies[key].text,
            replier: replies[key].replier,
            comment: replies[key].comment,
            timestamp: replies[key].timestamp,
        });
    }
    return {
        type: actionTypes.SET_COMMENT_REPLIES,
        replies: loadedReplies,
    }
}

export const setCommentLatestReplies = (replies) => {
    const loadedReplies = [];
    for(let key in replies){
        loadedReplies.push({
            id: replies[key].id,
            text: replies[key].text,
            replier: replies[key].replier,
            comment: replies[key].comment,
            timestamp: replies[key].timestamp,
        });
    }
    return {
        type: actionTypes.SET_COMMENT_LATEST_REPLIES,
        latestComments: loadedReplies,
    }
}


export const repliesFetchFail = (error) => {
    return {
        type: actionTypes.REPLY_FETCH_FAIL,
        error: error,
    }
}

export const addReplySuccess = () => {
    return {
        type: actionTypes.ADD_REPLY_SUCCESS,
    }
}

export const addReplyFail = (error) => {
    return {
        type: actionTypes.ADD_REPLY_FAIL,
        error: error,
    }
}


