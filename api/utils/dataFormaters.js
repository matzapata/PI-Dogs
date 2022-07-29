
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
        image: b.image,
        weight: `${b.weight_min} - ${b.weight_max}`,
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
        lifespan: b.life_span.replace(' years', ''),
        height: b.height.metric
    };
};

const formatDogDbDetail = (b) => {
    return {
        id: b.id,
        name: b.name,
        image: b.image,
        temperament: b.temperaments.map(t => t.name),
        weight: `${b.weight_min} - ${b.weight_max}`,
        lifespan: `${b.lifespan_min} - ${b.lifespan_max}`,
        height: `${b.height_min} - ${b.height_max}`
    };
};

module.exports = {
    formatDogApi,
    formatDogDb,
    formatDogApiDetail,
    formatDogDbDetail,
};