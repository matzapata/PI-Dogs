import {
    NEXT_PAGE,
    PREV_PAGE,
    SET_DOGS,
    SET_DOG_DETAIL,
    SET_TEMPERAMENTS,
    SORT_DOGS,
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
    };
}

export function prevPage() {
    return {
        type: PREV_PAGE
    };
}

export function sortDogsAZ() {
    return {
        type: SORT_DOGS,
        payload: function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        }
    };
}

export function sortDogsZA() {
    return {
        type: SORT_DOGS,
        payload: function (a, b) {
            if (a.name < b.name) { return 1; }
            if (a.name > b.name) { return -1; }
            return 0;
        }
    };
}

export function sortDogsWeightHL() {
    return {
        type: SORT_DOGS,
        payload: function (a, b) {
            const aWeights = a.weight.replace(/\s/g, '').split('-')
            const aHWeight = (aWeights.length === 1)? parseInt(a.weight) : parseInt(aWeights[1]); 
            
            const bWeights = b.weight.replace(/\s/g, '').split('-')
            const bHWeight = (bWeights.length === 1)? parseInt(b.weight) : parseInt(bWeights[1]); 
            
            if (aHWeight < bHWeight) { return 1; }
            if (aHWeight > bHWeight) { return -1; }
            return 0;
        }
    };
}

export function sortDogsWeightLH() {
    return {
        type: SORT_DOGS,
        payload: function (a, b) {
            const aWeights = a.weight.replace(/\s/g, '').split('-')
            const aHWeight = (aWeights.length === 1)? parseInt(a.weight) : parseInt(aWeights[1]); 
            
            const bWeights = b.weight.replace(/\s/g, '').split('-')
            const bHWeight = (bWeights.length === 1)? parseInt(b.weight) : parseInt(bWeights[1]); 
            
            if (aHWeight < bHWeight) { return -1; }
            if (aHWeight > bHWeight) { return 1; }
            return 0;
        }
    };
}
