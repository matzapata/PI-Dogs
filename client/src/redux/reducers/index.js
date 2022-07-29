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

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOGS: {
            const totalPages = Math.ceil(action.payload.length / state.pagination.pageSize);

            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload,
                pagination: {
                    next: (totalPages === 1) ? null : 2,
                    prev: null,
                    current: 1,
                    total: totalPages,
                    pageSize: state.pagination.pageSize,
                    pageContent: action.payload.slice(0, state.pagination.pageSize)
                }
            };
        }
        case SET_SEARCH: 
            return {
                ...state,
                search: action.payload
            }
        case SET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: {
                    ...action.payload
                }
            };
        case SET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case NEXT_PAGE:
            return {
                ...state,
                pagination: {
                    next: (state.pagination.current + 1 === state.pagination.total) ? null : state.pagination.current + 2,
                    prev: state.pagination.current,
                    current: state.pagination.current + 1,
                    total: state.pagination.total,
                    pageSize: state.pagination.pageSize,
                    pageContent: state.filteredDogs.slice(
                        (state.pagination.current) * state.pagination.pageSize
                        ,
                        (state.pagination.current + 1) * state.pagination.pageSize
                    )
                }
            };
        case PREV_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    next: state.pagination.current,
                    prev: (state.pagination.current - 1 === 1) ? null : state.pagination.current - 2,
                    current: state.pagination.current - 1,
                    pageContent: state.filteredDogs.slice(
                        (state.pagination.current - 2) * state.pagination.pageSize
                        ,
                        (state.pagination.current - 1) * state.pagination.pageSize
                    )
                }
            };
        case SET_PAGE:
            return {
                ...state,
                pagination: {
                    next: (action.payload === state.pagination.total) ? null : action.payload + 1,
                    prev: action.payload - 1,
                    current: action.payload,
                    total: state.pagination.total,
                    pageSize: state.pagination.pageSize,
                    pageContent: state.filteredDogs.slice(
                        (action.payload - 1) * state.pagination.pageSize
                        ,
                        (action.payload) * state.pagination.pageSize
                    )
                }
            };
        case SORT_DOGS: {
            const sortFilteredDogs = [...state.filteredDogs].sort(action.payload);

            return {
                ...state,
                dogs: [...state.dogs].sort(action.payload),
                filteredDogs: sortFilteredDogs,
                pagination: {
                    next: (state.pagination.total === 1) ? null : 2,
                    prev: null,
                    current: 1,
                    total: state.pagination.total,
                    pageSize: state.pagination.pageSize,
                    pageContent: sortFilteredDogs.slice(0, state.pagination.pageSize)
                }
            };
        }
        case FILTER_DOGS_TEMPERAMENT: {
            const filteredDogs = applyFilters(state.dogs, [filterByOrigin(state.filters.origin), filterByTemperament(action.payload)]);
            const totalPages = Math.ceil(filteredDogs.length / state.pagination.pageSize);

            return {
                ...state,
                filteredDogs: filteredDogs,
                filters: {
                    ...state.filters,
                    temperament: action.payload
                },
                pagination: {
                    next: (totalPages === 1) ? null : 2,
                    prev: null,
                    current: 1,
                    total: totalPages,
                    pageSize: state.pagination.pageSize,
                    pageContent: filteredDogs.slice(0, state.pagination.pageSize)
                }
            };
        }
        case FILTER_DOGS_ORIGIN: {
            const filteredDogs = applyFilters(state.dogs, [filterByOrigin(action.payload), filterByTemperament(state.filters.temperament)]);
            const totalPages = Math.ceil(filteredDogs.length / state.pagination.pageSize);

            return {
                ...state,
                filteredDogs: filteredDogs,
                filters: {
                    ...state.filters,
                    origin: action.payload
                },
                pagination: {
                    next: (totalPages === 1) ? null : 2,
                    prev: null,
                    current: 1,
                    total: totalPages,
                    pageSize: state.pagination.pageSize,
                    pageContent: filteredDogs.slice(0, state.pagination.pageSize)
                }
            };
        }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return { ...state };
    }
};

export default rootReducer;