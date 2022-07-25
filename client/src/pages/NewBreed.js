
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { fetchTemperaments } from "../redux/actions";

import sComponents from "../styles/Components.module.css";
import s from "./NewBreed.module.css";
import CloseIcon from "../components/Icons/Close";
import { Link } from "react-router-dom";
import { dogApiCreateNewDog } from "../utils/apiDogs";

export default function NewBreed() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [isValid, setIsValid] = useState(false);
    const [newDog, setNewDog] = useState(null);
    const [state, setState] = useState({
        name: '',
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        minLifespan: 0,
        maxLifespan: 0,
        temperaments: [],
        addTemperament: null
    });
    const [errors, setErrors] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await dogApiCreateNewDog(
            state.name,
            `${state.minHeight} - ${state.maxHeight}`,
            `${state.minWeight} - ${state.maxWeight}`,
            `${state.minLifespan} - ${state.maxLifespan}`,
            state.temperaments.map(t => t.id)
        );

        setNewDog(res.data);

        window.scrollTo(0, 0);

        setState({
            name: '',
            minHeight: 0,
            maxHeight: 0,
            minWeight: 0,
            maxWeight: 0,
            minLifespan: 0,
            maxLifespan: 0,
            temperaments: [],
            addTemperament: null
        });
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const addTemperament = () => {
        const newTemperamentId = (state.addTemperament) ? state.addTemperament : temperaments[0].id;
        if (state.temperaments.find(t => t.id === parseInt(newTemperamentId))) return true;

        const temp = temperaments.find(t => t.id === parseInt(newTemperamentId));
        setState({
            ...state,
            temperaments: (temp) ? [...state.temperaments, temp] : [...state.temperaments],
            addTemperament: null,
        });
    };

    const removeTemperament = (id) => {
        setState({
            ...state,
            temperaments: state.temperaments.filter(t => t.id !== id),
        });
    };

    useEffect(() => {
        // Error validations
        const errorMsgs = { ...errors };

        if (state.name === '') errorMsgs.name = 'Name is required';
        else if (/[^a-zA-Z]/.test(state.name.replace(/\s/g, ''))) errorMsgs.name = 'Name can only contain alphabet chars';
        else errorMsgs.name = '';

        if (state.minHeight <= 0) errorMsgs.minHeight = 'Min height must be greater than 0';
        else errorMsgs.minHeight = '';

        if (state.maxHeight <= 0) errorMsgs.maxHeight = 'Max height must be greater than 0';
        else if (state.maxHeight <= state.minHeight) errorMsgs.maxHeight = 'Max height must be greater than min height';
        else errorMsgs.maxHeight = '';

        if (state.minWeight <= 0) errorMsgs.minWeight = 'Min weight must be greater than 0';
        else errorMsgs.minWeight = '';

        if (state.maxWeight <= 0) errorMsgs.maxWeight = 'Max weight must be greater than 0';
        else if (state.maxWeight <= state.minWeight) errorMsgs.maxWeight = 'Max weight must be greater than min weight';
        else errorMsgs.maxWeight = '';

        if (state.minLifespan <= 0) errorMsgs.minLifespan = 'Min lifespan must be greater than 0';
        else errorMsgs.minLifespan = '';

        if (state.maxLifespan <= 0) errorMsgs.maxLifespan = 'Max lifespan must be greater than 0';
        else if (state.maxLifespan <= state.minLifespan) errorMsgs.maxLifespan = 'Max lifespan must be greater than min lifespan';
        else errorMsgs.maxLifespan = '';

        let errorsCount = 0;
        for (let key of Object.keys(errorMsgs)) {
            if (errorMsgs[key] !== '') errorsCount++;
        }

        setIsValid(errorsCount === 0);
        setErrors(errorMsgs);
    }, [state]);

    useEffect(() => {
        dispatch(fetchTemperaments());
    }, []);

    return (
        <div className={s.container}>
            <div className={s.backBtnContainer}>
                <BackButton />
            </div>
            <form onSubmit={onSubmit} className={s.formContainer}>
                <h1 className={s.header}>Create a new breed</h1>
                {newDog !== null &&
                    <div className={s.successMsg}>
                        <span>Successfully created new breed </span>
                        <Link to={`/breeds/${newDog.id}`}>{newDog.name}</Link>
                    </div>
                }
                <div>
                    <label className={sComponents.formLabel}>Name</label>
                    <input className={sComponents.formInput} value={state.name} onChange={onChange} type="text" name="name" placeholder="Breed name" />
                    <p className={s.error}>{errors.name}</p>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min height</label>
                        <input className={sComponents.formInput} value={state.minHeight} onChange={onChange} type="number" name="minHeight" placeholder="minHeight" />
                        <p className={s.error}>{errors.minHeight}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max height</label>
                        <input className={sComponents.formInput} value={state.maxHeight} onChange={onChange} type="number" name="maxHeight" placeholder="maxHeight" />
                        <p className={s.error}>{errors.maxHeight}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min weight</label>
                        <input className={sComponents.formInput} value={state.minWeight} onChange={onChange} type="number" name="minWeight" placeholder="minWeight" />
                        <p className={s.error}>{errors.minWeight}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max weight</label>
                        <input className={sComponents.formInput} value={state.maxWeight} onChange={onChange} type="number" name="maxWeight" placeholder="maxWeight" />
                        <p className={s.error}>{errors.maxWeight}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min lifespan</label>
                        <input className={sComponents.formInput} value={state.minLifespan} onChange={onChange} type="number" name="minLifespan" placeholder="minLifespan" />
                        <p className={s.error}>{errors.minLifespan}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max lifespan</label>
                        <input className={sComponents.formInput} value={state.maxLifespan} onChange={onChange} type="number" name="maxLifespan" placeholder="maxLifespan" />
                        <p className={s.error}>{errors.maxLifespan}</p>
                    </div>
                </div>
                <div>
                    <label className={sComponents.formLabel}>Temperaments</label>
                    <select className={sComponents.select} name="addTemperament" onChange={onChange}>
                        {temperaments?.map((t, i) => <option value={t.id} key={i}>{t.name}</option>)}
                    </select>
                    <button className={sComponents.btnSm} style={{ marginLeft: "0.5rem" }} type="button" onClick={() => addTemperament()}>Add</button>
                    <ul className={s.temperamentsList}>
                        {state.temperaments.map((t, i) =>
                            <li key={i} className={s.temperament}>
                                <span>{t.name}</span>
                                <button type="button" onClick={() => removeTemperament(t.id)}>
                                    <CloseIcon />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
                <button disabled={!isValid} type="submit" className={sComponents.btnSm} >Save</button>
            </form>
        </div>
    );
}