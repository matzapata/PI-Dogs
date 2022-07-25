import axios from "axios";


export function dogApiGetAllDogs() {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs`);
}

export function dogApiGetDogByName(name) {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs?name=${name}`);
}

export function dogApiGetDogDetails(dogId) {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/dogs/${dogId}`);
}

export function dogApiGetDogTemperaments() {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/temperaments`);
}

export function dogApiCreateNewDog(name, height, weight, lifespan, temperamentIds) {

    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_DOMAIN}/api/dogs`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name,
            height,
            weight,
            lifespan,
            temperamentIds
        })
    });
}