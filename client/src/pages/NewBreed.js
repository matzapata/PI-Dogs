import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperaments } from "../redux/actions";

export default function NewBreed() {
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [state, setState] = useState({
        name: '',
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        minLifespan: 0,
        maxLifespan: 0,
        temperaments: [],
        errors: {
            name: '',
            height: '',
            weight: '',
            lifespan: '',
        }
    });
    const [tempFilter, setTempFilter] = useState('');
    const [temperaments, setTemperaments] = useState([]);


    function onChange(e) {
        setState(s => {
            return {
                ...s,
                [e.target.name]: e.target.value
            };
        });
    }
    function onSubmit(e) {
        e.preventDefault();

        console.log(state);
    }

    function addTemperament(temperament) {
        setState({
            ...state,
            temperaments: [...state.temperaments, temperament]
        });
        setTemperaments(temperaments.filter(t => t.id !== temperament.id));
    }
    function removeTemperament(temperament) {
        setState({
            ...state,
            temperaments: state.temperaments.filter(t => t.id !== temperament.id)
        });
        setTemperaments(sortTemperaments([...temperaments, temperament]));
    }
    function sortTemperaments(temperaments) {
        let ordered = [...temperaments];
        ordered.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        return ordered;
    }

    useEffect(() => {
        dispatch(fetchTemperaments());
    }, []);

    useEffect(() => {
        if (tempFilter === '') setTemperaments(sortTemperaments(allTemperaments));
        else setTemperaments(sortTemperaments(allTemperaments.filter(t => t.name.toLowerCase().includes(tempFilter.toLowerCase()))));
    }, [tempFilter, allTemperaments]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={state.name}
                    onChange={onChange}
                />
                <p>{state.errors.name}</p>

                <label>Height</label>
                <div>
                    <input
                        type="number"
                        name="minHeight"
                        placeholder="min"
                        value={state.minHeight}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        name="maxHeight"
                        placeholder="max"
                        value={state.maxHeight}
                        onChange={onChange}
                    />
                </div>
                <p>{state.errors.height}</p>

                <label>Weight</label>
                <div>
                    <input
                        type="number"
                        name="minWeight"
                        placeholder="min"
                        value={state.minWeight}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        name="maxWeight"
                        placeholder="max"
                        value={state.maxWeight}
                        onChange={onChange}
                    />
                </div>
                <p>{state.errors.weight}</p>


                <label>Lifespan</label>
                <div>
                    <input
                        type="number"
                        name="minLifespan"
                        placeholder="min"
                        value={state.minLifespan}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        name="maxLifespan"
                        placeholder="max"
                        value={state.maxLifespan}
                        onChange={onChange}
                    />
                </div>
                <p>{state.errors.lifespan}</p>

                <label>Temperaments</label>
                <ul>
                    {state.temperaments?.map((t, i) => (
                        <li key={i}>
                            <span>{t.name}</span>
                            <button onClick={() => removeTemperament(t)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <button type="submit">Save</button>
            </form>
            <div>
                <input
                    type="text"
                    placeholder="Add new temperament"
                    onChange={(e) => { setTempFilter(e.target.value); }}
                />
                <ul>
                    {temperaments?.map((t, i) => (
                        <li key={i}>
                            <span>{t.name}</span>
                            <button onClick={() => addTemperament(t)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}