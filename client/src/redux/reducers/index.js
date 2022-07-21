import {
    SET_DOGS,
    SET_DOG_DETAIL,
    SET_TEMPERAMENTS,
    ORDER_DOGS_AZ,
    ORDER_DOGS_ZA,
    ORDER_DOGS_HL,
    ORDER_DOGS_LH,
    NEXT_PAGE,
    PREV_PAGE,
} from "../actions/constants";

const initialState = {
    dogs: [],
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
                    pageContent: state.dogs.slice(
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
                    pageContent: state.dogs.slice(
                        (state.pagination.current - 2) * state.pagination.pageSize
                        ,
                        (state.pagination.current -1) * state.pagination.pageSize
                    )
                }
            };
        default:
            return { ...state };
    }
};

export default rootReducer;