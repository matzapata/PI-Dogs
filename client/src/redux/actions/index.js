import {
    FILTER_DOGS_ORIGIN,
    FILTER_DOGS_TEMPERAMENT,
    NEXT_PAGE,
    PREV_PAGE,
    SET_DOGS,
    SET_DOG_DETAIL,
    SET_TEMPERAMENTS,
    SORT_DOGS,
    SET_PAGE,
    SET_SEARCH,
    SET_LOADING,
} from "./constants";
import { dogApiGetAllDogs, dogApiGetDogByName, dogApiGetDogDetails, dogApiGetDogTemperaments } from "../../utils/apiDogs";

export function setDogs(dogs) {
    return {
        type: SET_DOGS,
        payload: dogs
    };
}

export function setSearch(search) {
    return {
        type: SET_SEARCH,
        payload: search
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
    return async function (dispatch) {
        dispatch(setLoading(true));
        dispatch(setSearch("All"));
        try {
            const res = await dogApiGetAllDogs();
            dispatch(setDogs(res.data));
        } catch (e) {
            dispatch(setDogs([]));
        }
        dispatch(setLoading(false));
    };
}

export function fetchDogsName(name) {
    return async function (dispatch) {
        dispatch(setLoading(true));
        dispatch(setSearch(name));
        try {
            const res = await dogApiGetDogByName(name);
            dispatch(setDogs(res.data));
        } catch (e) {
            dispatch(setDogs([]));
        }
        dispatch(setLoading(false));
    };
}

export function fetchTemperaments() {
    return async function (dispatch) {
        try {
            const res = await dogApiGetDogTemperaments();
            dispatch(setTemperaments(res.data.sort(function (a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })));
        } catch (e) { }
    };
}

export function fetchDogDetail(dogId) {
    return async function (dispatch) {
        dispatch(setLoading(true));
        try {
            const response = await dogApiGetDogDetails(dogId);
            dispatch(setDogDetail(response.data));
        } catch (e) {
            dispatch(setDogDetail({
                id: null,
                name: null,
                image: null,
                weight: null,
                temperament: null,
                lifespan: null,
                height: null,
            }));
        }
        dispatch(setLoading(false));
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

export function setPage(p) {
    return {
        type: SET_PAGE,
        payload: p
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
            const aWeights = a.weight.replace(/\s/g, '').split('-');
            const aHWeight = (aWeights.length === 1) ? parseInt(a.weight) : parseInt(aWeights[1]);

            const bWeights = b.weight.replace(/\s/g, '').split('-');
            const bHWeight = (bWeights.length === 1) ? parseInt(b.weight) : parseInt(bWeights[1]);

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
            const aWeights = a.weight.replace(/\s/g, '').split('-');
            const aHWeight = (aWeights.length === 1) ? parseInt(a.weight) : parseInt(aWeights[1]);

            const bWeights = b.weight.replace(/\s/g, '').split('-');
            const bHWeight = (bWeights.length === 1) ? parseInt(b.weight) : parseInt(bWeights[1]);

            if (aHWeight < bHWeight) { return -1; }
            if (aHWeight > bHWeight) { return 1; }
            return 0;
        }
    };
}


export function filterDogsTemperament(temperament) {
    return {
        type: FILTER_DOGS_TEMPERAMENT,
        payload: temperament
    };
}

export function filterDogsOrigin(origin) {
    return {
        type: FILTER_DOGS_ORIGIN,
        payload: origin
    };
}

export function setLoading(loading) {
    return {
        type: SET_LOADING,
        payload: loading
    };
}

