import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-place';

export const fetchPlaces = () => {
    return dispatch => {
        axios.get('/')
        .then(response => {
            dispatch(setPlaces(response.data));
        }).catch(error => {
            dispatch(fetchPlacesFail(error));
        });
    }
}


export const setPlaces = (places) => {
    const loadedPlaces = [];
    for(let key in places){
        loadedPlaces.push({
            id: places[key].id,
            name: places[key].name,
            location: places[key].location,
            imageUrl: places[key].imageUrl,
            cost: places[key].cost,
            elevation: places[key].elevation,
            description: places[key].description,
            type: places[key].placeType,
            isUWHS: places[key].isUWHS,
            population: places[key].population,
        });
    }
    return {
        type: actionTypes.SET_PLACES,
        places: loadedPlaces,
    }
}


export const fetchPlacesFail = (error) => {
    return{
        type: actionTypes.FETCH_PLACES_FAIL,
        error: error,
    }
}



export const fetchPlace = (id) => {
    return dispatch => {
        axios.get(`/${id}/`)
        .then(response => {
            dispatch(setPlace(response.data));
        }).catch(error => {
            dispatch(fetchPlaceFail(error));
        });
    }
}


export const setPlace = (place) => {
    const loadedPlace = {
        id: place.id,
        name: place.name,
        location: place.location,
        imageUrl: place.imageUrl,
        cost: place.cost,
        elevation: place.elevation,
        description: place.description,
        type: place.placeType,
        isUWHS: place.isUWHS,
        population: place.population,
    };
    return {
        type: actionTypes.SET_PLACE,
        place: loadedPlace,
    }
}


export const fetchPlaceFail = (error) => {
    return{
        type: actionTypes.FETCH_PLACE_FAIL,
        error: error,
    }
}


