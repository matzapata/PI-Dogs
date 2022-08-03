import applyFilters, { filterByOrigin, filterByTemperament } from "../../utils/applyFilters";
import {
    SET_DOGS,
    SET_DOG_DETAIL,
    SET_TEMPERAMENTS,
    NEXT_PAGE,
    PREV_PAGE,
    SORT_DOGS,
    FILTER_DOGS_TEMPERAMENT,
    FILTER_DOGS_ORIGIN,
    SET_PAGE,
    SET_SEARCH,
    SET_LOADING,
} from "../actions/constants";

export const initialState = {
    dogs: [],
    filteredDogs: [],
    loading: false,
    search: "All",
    filters: {
        temperament: [],
        origin: 'all',
    },
    pagination: {
        next: 0,
        prev: 0,
        current: 0,
        total: 0,
        pageSize: 8,
        pageContent: []
    },
    dogDetail: {
        id: null,
        name: null,
        image: null,
        weight: null,
        temperament: null,
        lifespan: null,
        height: null,
    },
    temperaments: []
};

const pagination = (dogs, pageNumber, pageSize = 8) => {
    const totalPages = Math.ceil(dogs.length / pageSize);
    return {
        next: (pageNumber === totalPages || totalPages === 1) ? null : pageNumber + 1,
        prev: (pageNumber - 1) ? pageNumber - 1 : null,
        current: pageNumber,
        total: totalPages,
        pageSize: pageSize,
        pageContent: dogs.slice(
            (pageNumber - 1) * pageSize
            ,
            (pageNumber) * pageSize
        )
    };
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOGS: 
            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload,
                pagination: pagination(action.payload, 1)
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            };
        case SET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            };
        case SET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case NEXT_PAGE:
            return {
                ...state,
                pagination: pagination(state.filteredDogs, state.pagination.next)
            };
        case PREV_PAGE:
            return {
                ...state,
                pagination: pagination(state.filteredDogs, state.pagination.prev)
            };
        case SET_PAGE:
            return {
                ...state,
                pagination: pagination(state.filteredDogs, action.payload)
            };
        case SORT_DOGS: {
            const sortFilteredDogs = [...state.filteredDogs].sort(action.payload);

            return {
                ...state,
                dogs: [...state.dogs].sort(action.payload),
                filteredDogs: sortFilteredDogs,
                pagination: pagination(sortFilteredDogs, 1)
            };
        }
        case FILTER_DOGS_TEMPERAMENT: {
            const filteredDogs = applyFilters(state.dogs, [filterByOrigin(state.filters.origin), filterByTemperament(action.payload)]);

            return {
                ...state,
                filteredDogs: filteredDogs,
                filters: {
                    ...state.filters,
                    temperament: action.payload
                },
                pagination: pagination(filteredDogs, 1)
            };
        }
        case FILTER_DOGS_ORIGIN: {
            const filteredDogs = applyFilters(state.dogs, [filterByOrigin(action.payload), filterByTemperament(state.filters.temperament)]);

            return {
                ...state,
                filteredDogs: filteredDogs,
                filters: {
                    ...state.filters,
                    origin: action.payload
                },
                pagination: pagination(filteredDogs, 1)
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return { ...state };
    }
};

export default rootReducer;