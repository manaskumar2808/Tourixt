import * as actionTypes from './actionTypes';
import axios from '../../axios-follow';

export const fetchFollowers = () => {
    const userId = localStorage.getItem('userId');
    return dispatch => {
        axios.get(`${userId}/followers/`)
        .then(response => {
            dispatch(setFollowers(response.data));
        }).catch(error => {
            dispatch(followFetchFail(error))
        });
    }
}

export const setFollowers = (followers) => {
    const loadedFollowers = [];
    for(let key in followers){
        loadedFollowers.push({
            id: followers[key].id,
            follower: followers[key].follower,
            followed: followers[key].followed,
        });
    }
    return {
        type: actionTypes.SET_FOLLOWERS,
        followers: loadedFollowers,
    }
}

export const fetchFolloweds = () => {
    const userId = localStorage.getItem('userId');
    return dispatch => {
        axios.get(`${userId}/followeds/`)
        .then(response => {
            dispatch(setFolloweds(response.data));
        }).catch(error => {
            dispatch(followFetchFail(error))
        });
    }
}

export const setFolloweds = (followeds) => {
    const loadedFolloweds = [];
    for(let key in followeds){
        loadedFolloweds.push({
            id: followeds[key].id,
            follower: followeds[key].follower,
            followed: followeds[key].followed,
        });
    }
    return {
        type: actionTypes.SET_FOLLOWEDS,
        followeds: loadedFolloweds,
    }
}


export const followFetchFail = (error) => {
    return {
        type: actionTypes.FOLLOW_FETCH_FAIL,
        error: error,
    }
}


