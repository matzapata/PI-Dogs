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

export function filterByTemperament(temperaments) {
    return function (dog) {
        if (temperaments.length === 0) return true;
        else {
            for (const ft of temperaments) {
                if (dog.temperament?.includes(ft)) return true;
            }
            return false;
        }
    };
}