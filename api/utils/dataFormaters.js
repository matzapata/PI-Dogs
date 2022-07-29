
const formatDogApi = (b) => {
    return {
        id: b.id,
        name: b.name,
        image: (b.image?.url) ? b.image?.url : "",
        weight: b.weight.metric,
        temperament: (b.temperament === undefined) ? [] : b.temperament?.replace(/\s/g, '').split(',')
    };
};

const formatDogDb = (b) => {
    return {
        id: b.id,
        name: b.name,
        image: "",
        weight: b.weight,
        temperament: b.temperaments.map(t => t.name)
    };
};

const formatDogApiDetail = (b) => {
    return {
        id: b.id,
        name: b.name,
        image: (b.image?.url) ? b.image?.url : "",
        weight: b.weight.metric,
        temperament: (b.temperament === undefined) ? [] : b.temperament?.replace(/\s/g, '').split(','),
        lifespan: b.life_span,
        height: b.height.metric
    };
};

const formatDogDbDetail = (b) => {
    return {
        id: b.id,
        name: b.name,
        image: "",
        weight: b.weight,
        temperament: b.temperaments.map(t => t.name),
        lifespan: b.lifespan,
        height: b.height
    };
};

module.exports = {
    formatDogApi,
    formatDogDb,
    formatDogApiDetail,
    formatDogDbDetail,
};