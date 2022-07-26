import axios from "axios";

const API_DOMAIN = (process.env.NODE_ENV === "production")? "" : "http://localhost:3001"


export function dogApiGetAllDogs() {
    return axios.get(`${API_DOMAIN}/api/dogs`);
}

export function dogApiGetDogByName(name) {
    return axios.get(`${API_DOMAIN}/api/dogs?name=${name}`);
}

export function dogApiGetDogDetails(dogId) {
    return axios.get(`${API_DOMAIN}/api/dogs/${dogId}`);
}

export function dogApiGetDogTemperaments() {
    return axios.get(`${API_DOMAIN}/api/temperaments`);
}

export function dogApiCreateNewDog(name, height, weight, lifespan, temperamentIds) {

    return axios({
        method: 'post',
        url: `${API_DOMAIN}/api/dogs`,
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