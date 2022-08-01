import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import nock from "nock";
import axios from 'axios';
import data from "./utils/db.json";
import { fetchAllDogs, fetchDogDetail, fetchDogsName, fetchTemperaments, filterDogsOrigin, filterDogsTemperament, nextPage, prevPage, setDogDetail, setDogs, setPage, setSearch, setTemperaments } from "../redux/actions/index";
import { FILTER_DOGS_ORIGIN, FILTER_DOGS_TEMPERAMENT, NEXT_PAGE, PREV_PAGE, SET_DOGS, SET_DOG_DETAIL, SET_LOADING, SET_PAGE, SET_SEARCH, SET_TEMPERAMENTS } from '../redux/actions/constants';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Actions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Set dogs', () => {
        store.dispatch(setDogs(data.dogs));
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_DOGS, payload: data.dogs }]);
    });

    it('Set search', () => {
        store.dispatch(setSearch("search"));
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_SEARCH, payload: "search" }]);
    });

    it('Set dog detail', () => {
        store.dispatch(setDogDetail(data.dogDetail));
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_DOG_DETAIL, payload: data.dogDetail }]);
    });

    it('Set temperaments', () => {
        store.dispatch(setTemperaments(data.temperaments));
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_TEMPERAMENTS, payload: data.temperaments }]);
    });

    it('Fetch all dogs', async () => {
        nock("http://localhost:3001").get('/api/dogs').reply(200, data.dogs);
        await store.dispatch(fetchAllDogs());
        const actions = store.getActions();

        expect(actions).toEqual([
            { type: SET_LOADING, payload: true },
            { type: SET_SEARCH, payload: "All" },
            { type: SET_DOGS, payload: data.dogs },
            { type: SET_LOADING, payload: false },
        ]);
    });

    it('Fetch dogs with name hound', async () => {
        const response = data.dogs.filter(d => d.name.includes("hound"));
        nock("http://localhost:3001").get('/api/dogs?name=hound').reply(200, response);
        await store.dispatch(fetchDogsName('hound'));
        const actions = store.getActions();

        expect(actions).toEqual([
            { type: SET_LOADING, payload: true },
            { type: SET_SEARCH, payload: "hound" },
            { type: SET_DOGS, payload: response },
            { type: SET_LOADING, payload: false },
        ]);
    });

    it('Fetch temperaments', async () => {
        nock("http://localhost:3001").get('/api/temperaments').reply(200, data.temperaments);
        await store.dispatch(fetchTemperaments());
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: SET_TEMPERAMENTS,
                payload: data.temperaments.sort(function (a, b) {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                })
            }]
        );
    });

    it('Fetch dog detail', async () => {
        const dog = data.dogs.find(d => d.id === 1);
        nock("http://localhost:3001").get('/api/dogs/1').reply(200, dog);
        nock("http://localhost:3001").get('/api/dogs/notfound').reply(400);

        await store.dispatch(fetchDogDetail(1));
        await store.dispatch(fetchDogDetail("notfound"));

        const actions = store.getActions();
        console.log(actions);
        expect(actions).toEqual([
            { type: 'SET_LOADING', payload: true },
            {
                type: 'SET_DOG_DETAIL',
                payload: {
                    id: 1,
                    name: 'Affenpinscher',
                    image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
                    weight: '3 - 6',
                    temperament: 'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
                    origin: 'dogApi'
                }
            },
            { type: 'SET_LOADING', payload: false },
            { type: 'SET_LOADING', payload: true },
            {
                type: 'SET_DOG_DETAIL',
                payload: {
                    id: null,
                    name: null,
                    image: null,
                    weight: null,
                    temperament: null,
                    lifespan: null,
                    height: null
                }
            },
            { type: 'SET_LOADING', payload: false },
        ]);
    });

    it('Pages', () => {
        store.dispatch(nextPage());
        store.dispatch(prevPage());
        store.dispatch(setPage(1));

        const actions = store.getActions();
        expect(actions).toEqual([
            { type: NEXT_PAGE },
            { type: PREV_PAGE },
            { type: SET_PAGE, payload: 1 },
        ]);
    });

    it('Filter dogs', () => {
        store.dispatch(filterDogsOrigin('user'));
        store.dispatch(filterDogsTemperament('temperament'));

        const actions = store.getActions();
        expect(actions).toEqual([
            { type: FILTER_DOGS_ORIGIN, payload: 'user' },
            { type: FILTER_DOGS_TEMPERAMENT, payload: 'temperament' }
        ]);
    });


});