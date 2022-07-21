import {
    NEXT_PAGE,
    PREV_PAGE,
    SET_DOGS,
    SET_DOG_DETAIL,
    SET_TEMPERAMENTS,
} from "./constants";
import axios from "axios";

export function setDogs(dogs) {
    return {
        type: SET_DOGS,
        payload: dogs
    };
}

export function setDogDetail(dogDetail) {
    return {
        type: SET_DOG_DETAIL,
        payload: dogDetail
    };
}

export function setTemperaments(temperaments) {
    return {
        type: SET_TEMPERAMENTS,
        payload: temperaments
    };
}

export function fetchAllDogs() {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs`)
            .then(r => r.data)
            .then(d => dispatch(setDogs(d)))
            .catch(e => console.log(e));
    };
}

export function fetchDogsName(name) {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs?name=${name}`)
            .then(r => r.data)
            .then(d => dispatch(setDogs(d)))
            .catch(e => console.log(e));
    };
}

export function fetchTemperaments() {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/temperaments`)
            .then(r => r.data)
            .then(t => dispatch(setTemperaments(t)))
            .catch(e => console.log(e));
    };
}

export function fetchDogDetail(dogId) {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs/${dogId}`)
            .then(r => r.data)
            .then(d => dispatch(setDogDetail(d)))
            .catch(e => console.log(e));
    };
}

export function nextPage() {
    return {
        type: NEXT_PAGE
    }
}

export function prevPage() {
    return {
        type: PREV_PAGE
    }
}

