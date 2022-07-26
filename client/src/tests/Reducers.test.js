import data from "./utils/db.json";
import rootReducer, { initialState } from "../redux/reducers";
import { filterDogsOrigin, filterDogsTemperament, nextPage, prevPage, setDogDetail, setDogs, setPage, setSearch, setTemperaments, sortDogsAZ } from '../redux/actions';

describe('Reducers', () => {

    it("Should return the initial state if the action type is not valid", () => {
        expect(rootReducer(undefined, {})).toEqual(initialState);
    });

    it("SET_DOGS should save dogs on state and update pagination", () => {
        expect(rootReducer(undefined, setDogs(data.dogs))).toEqual({
            ...initialState,
            dogs: data.dogs,
            filteredDogs: data.dogs,
            pagination: {
                next: 2,
                prev: null,
                current: 1,
                total: Math.ceil(data.dogs.length / 8),
                pageSize: 8,
                pageContent: data.dogs.slice(0, 8)
            }
        });
    });

    it("SET_SEARCH should update search state", () => {
        expect(rootReducer(undefined, setSearch("search"))).toEqual({
            ...initialState,
            search: "search"
        });
    });

    it("SET_DOG_DETAIL should set dog detail", () => {
        expect(rootReducer(undefined, setDogDetail(data.dogDetail))).toEqual({
            ...initialState,
            dogDetail: data.dogDetail
        });
    });

    it("SET_TEMPERAMENTS should set temperaments", () => {
        expect(rootReducer(undefined, setTemperaments(data.temperaments))).toEqual({
            ...initialState,
            temperaments: data.temperaments
        });
    });

    it("NEXT_PAGE should update pagination", () => {
        const state = rootReducer(undefined, setDogs(data.dogs))
        const newState = rootReducer(state, nextPage());

        expect(newState).toEqual({
            ...state,
            pagination: {
                next: 3,
                prev: 1,
                current: 2,
                total: Math.ceil(data.dogs.length / 8),
                pageSize: 8,
                pageContent: data.dogs.slice(8, 16)
            }
        });
        expect(newState.pagination.pageContent.length).toEqual(8);
    });


    it("PREV_PAGE should update pagination", () => {
        const state = {
            ...initialState,
            dogs: data.dogs,
            filteredDogs: data.dogs,
            pagination: {
                next: 3,
                prev: 1,
                current: 2,
                total: Math.ceil(data.dogs.length / 8),
                pageSize: 8,
                pageContent: data.dogs.slice(8, 16)
            }
        };
        const newState = rootReducer(state, prevPage());

        expect(newState).toEqual({
            ...state,
            pagination: {
                next: 2,
                prev: null,
                current: 1,
                total: Math.ceil(data.dogs.length / 8),
                pageSize: 8,
                pageContent: data.dogs.slice(0, 8)
            }
        });
        expect(newState.pagination.pageContent.length).toEqual(8);
    });

    it("SET_PAGE should update pagination", () => {
        const state = rootReducer(undefined, setDogs(data.dogs))
        const newState = rootReducer(state, setPage(2));

        expect(newState).toEqual({
            ...state,
            pagination: {
                next: 3,
                prev: 1,
                current: 2,
                total: Math.ceil(data.dogs.length / 8),
                pageSize: 8,
                pageContent: data.dogs.slice(8, 16)
            }
        });
        expect(newState.pagination.pageContent.length).toEqual(8);
    });

    it("SORT_DOGS should sort the dogs using the payload function and update the page content", () => {
        function sortAZFn(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        }

        const state = rootReducer(undefined, setDogs(data.dogs));
        const newState = rootReducer(state, sortDogsAZ());

        expect(newState.pagination.pageContent).toEqual(state.pagination.pageContent.sort(sortAZFn));
    });

    it("FILTER_DOGS_ORIGIN should filter dogs based on origin and update filters state", () => {
        const state = rootReducer(undefined, setDogs(data.dogs));
        const newState = rootReducer(state, filterDogsOrigin("user"));
        expect(newState.filters.origin).toEqual("user")
        expect(newState.filteredDogs.length).toEqual(1);
    });
    
    it("FILTER_DOGS_TEMPERAMENT should filter dogs based on temperament and update filters state", () => {
        const state = rootReducer(undefined, setDogs(data.dogs))
        const newState = rootReducer(state, filterDogsTemperament("Stubborn"))
        expect(newState.filters.temperament).toEqual("Stubborn")
        expect(newState.filteredDogs.length).toEqual(4)
    });
});