require('dotenv').config()
const axios = require('axios');

async function getBreeds() {
    const res = await axios({
        method: 'get',
        url: 'https://api.thedogapi.com/v1/breeds',
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.DOG_API_KEY
        }
    });
    return res.data;
}

async function getBreedDetail(id) {
    const res = await axios({
        method: 'get',
        url: `https://api.thedogapi.com/v1/breeds/search?q=${id}`,
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.DOG_API_KEY
        }
    });
    return res.data;
}

module.exports = {
    getBreedDetail,
    getBreeds
};