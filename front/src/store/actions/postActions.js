import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

export const initPosts = () => {
    return {
        type: actionTypes.INIT_POSTS,
    }
}


export const fetchPosts = () => {
    return dispatch => {
        axios.get('').
        then(response => {
            dispatch(setPosts(response.data));
        }).catch(error => {
            dispatch(postFetchFailed(error));
        });
    }
}

export const setPosts = (posts) => {
    const loadedPosts = [];
    for(let key in posts){
        loadedPosts.push({
            key: key,
            id: posts[key].id,
            title: posts[key].title,
            content: posts[key].content,
            image: posts[key].image,
            imageUrl: posts[key].imageUrl,
            videoUrl: posts[key].videoUrl,
            creator: posts[key].creator,
        });
    }

    return {
        type: actionTypes.SET_ALL_POSTS,
        posts: loadedPosts,
    }
}


export const fetchPost = (id) => {
    return dispatch => {
        axios.get(`/${id}/`)
        .then(response => { 
            dispatch(setPost(response.data));
        }).catch(error => {
            dispatch(postFetchFailed(error));
        });
    }
}

export const setPost = (post) => {
    const loadedPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,
        creator: post.creator,
    };

    return {
        type: actionTypes.SET_POST,
        post: loadedPost,
    }
}


export const fetchUserPosts = (userId) => {
    return dispatch => {
        axios.get(`${userId}/feeds/`).
        then(response => {
            dispatch(setUserPosts(response.data));
        }).catch(error => {
            dispatch(postFetchFailed(error));
        });
    }
}

export const setUserPosts = (posts) => {
    const loadedPosts = [];
    for(let key in posts){
        loadedPosts.push({
            key: key,
            id: posts[key].id,
            title: posts[key].title,
            content: posts[key].content,
            image: posts[key].image,
            imageUrl: posts[key].imageUrl,
            videoUrl: posts[key].videoUrl,
            creator: posts[key].creator,
        });
    }

    return {
        type: actionTypes.SET_USER_POSTS,
        userPosts: loadedPosts,
    }
}


export const postFetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAILED,
        error: error,
    }
}