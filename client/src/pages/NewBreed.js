
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { fetchTemperaments } from "../redux/actions";

import sComponents from "../styles/Components.module.css";
import s from "./NewBreed.module.css";
import CloseIcon from "../components/Icons/Close";
import { Link } from "react-router-dom";
import { dogApiCreateNewDog } from "../utils/apiDogs";

const defaultState = {
    name: '',
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    lifespan_min: 0,
    lifespan_max: 0,
    image_url: "",
    temperaments: [],
    addTemperament: null
}

export default function NewBreed() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [isValid, setIsValid] = useState(false);
    const [newDog, setNewDog] = useState(null);
    const [state, setState] = useState(defaultState);
    const [errors, setErrors] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        lifespan_min: '',
        lifespan_max: '',
        image_url: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await dogApiCreateNewDog(
            state.name,
            state.height_min,
            state.height_max,
            state.weight_min,
            state.weight_max,
            state.lifespan_min,
            state.lifespan_max,
            state.image_url,
            state.temperaments.map(t => t.id)
        );

        setNewDog(res.data);

        window.scrollTo(0, 0);

        setState(defaultState);
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
        else if (state.name.length > 100) errorMsgs.name = 'Name can be a maximum of 100 characters';
        else errorMsgs.name = '';

        if (state.image_url !== "") {
            if (!/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(state.image_url)) errorMsgs.image_url = "Input is not a url";
            else errorMsgs.image_url = "";
        }  else errorMsgs.image_url = "";

        if (state.height_min <= 0) errorMsgs.height_min = 'Min height must be greater than 0';
        else errorMsgs.height_min = '';

        if (state.height_max <= 0) errorMsgs.height_max = 'Max height must be greater than 0';
        else if (state.height_max <= state.height_min) errorMsgs.height_max = 'Max height must be greater than min height';
        else errorMsgs.height_max = '';

        if (state.weight_min <= 0) errorMsgs.weight_min = 'Min weight must be greater than 0';
        else errorMsgs.weight_min = '';

        if (state.weight_max <= 0) errorMsgs.weight_max = 'Max weight must be greater than 0';
        else if (state.weight_max <= state.weight_min) errorMsgs.weight_max = 'Max weight must be greater than min weight';
        else errorMsgs.weight_max = '';

        if (state.lifespan_min <= 0) errorMsgs.lifespan_min = 'Min lifespan must be greater than 0';
        else errorMsgs.lifespan_min = '';

        if (state.lifespan_max <= 0) errorMsgs.lifespan_max = 'Max lifespan must be greater than 0';
        else if (state.lifespan_max <= state.lifespan_min) errorMsgs.lifespan_max = 'Max lifespan must be greater than min lifespan';
        else errorMsgs.lifespan_max = '';

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
                <div>
                    <label className={sComponents.formLabel}>Image url</label>
                    <input className={sComponents.formInput} value={state.image_url} onChange={onChange} type="text" name="image_url" placeholder="Image url (optional)" />
                    <p className={s.error}>{errors.image_url}</p>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min height</label>
                        <input className={sComponents.formInput} value={state.height_min} onChange={onChange} type="number" name="height_min" placeholder="height_min" />
                        <p className={s.error}>{errors.height_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max height</label>
                        <input className={sComponents.formInput} value={state.height_max} onChange={onChange} type="number" name="height_max" placeholder="height_max" />
                        <p className={s.error}>{errors.height_max}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min weight</label>
                        <input className={sComponents.formInput} value={state.weight_min} onChange={onChange} type="number" name="weight_min" placeholder="weight_min" />
                        <p className={s.error}>{errors.weight_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max weight</label>
                        <input className={sComponents.formInput} value={state.weight_max} onChange={onChange} type="number" name="weight_max" placeholder="weight_max" />
                        <p className={s.error}>{errors.weight_max}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min lifespan</label>
                        <input className={sComponents.formInput} value={state.lifespan_min} onChange={onChange} type="number" name="lifespan_min" placeholder="lifespan_min" />
                        <p className={s.error}>{errors.lifespan_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max lifespan</label>
                        <input className={sComponents.formInput} value={state.lifespan_max} onChange={onChange} type="number" name="lifespan_max" placeholder="lifespan_max" />
                        <p className={s.error}>{errors.lifespan_max}</p>
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