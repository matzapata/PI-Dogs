import checkIfValidUUID from "./validateUUID";


export default function applyFilters(arr, filters) {
    let newArr = [...arr];

    for (let filter of filters) {
        newArr = newArr.filter(filter);
    }

    return newArr;
}

export function filterByOrigin(origin) {
    return function (dog) {
        if (origin === 'all') return true;
        else if (origin === 'user' && checkIfValidUUID(dog.id)) return true;
        else if (origin === 'dogApi' && !checkIfValidUUID(dog.id)) return true;
        else return false;
    };
}

export function filterByTemperament(temperament) {
    return function (dog) {
        if (temperament === 'all') return true;
        else if (dog.temperament?.includes(temperament)) return true;
        else return false;
    };
}