const axios = require('axios');
require('dotenv').config({ path: '../.env' })

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

async function searchBreeds(name) {
    const res = await axios({
        method: 'get',
        url: `https://api.thedogapi.com/v1/breeds/search?q=${name}`,
        headers: {
            'Content-Type': 'application/json',
            "x-api-key": process.env.DOG_API_KEY
        }
    });
    return res.data;
}

module.exports = {
    searchBreeds,
    getBreeds
};