const axios = require('axios');
require('dotenv').config({ path: '../.env' });

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

    // Add images URL
    const breeds = await getBreeds()
    const response = res.data.map((r) => {
        const breed = breeds.find(b => b.id === r.id)
        if (breed) r.image = breed.image

        return r
    })

    return response;
}

module.exports = {
    searchBreeds,
    getBreeds
};