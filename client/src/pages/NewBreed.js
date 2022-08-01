
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
    addTemperament: null,
    errors: {
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        lifespan_min: '',
        lifespan_max: '',
        image_url: '',
    },
    requestError: '',
    disabled: true,
};

export default function NewBreed() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [newDog, setNewDog] = useState(null);
    const [state, setState] = useState(defaultState);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
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
        } catch (e) {
            setState({
                ...state,
                requestError: `${e.response.status} - ${e.response.data}`
            });
        }
    };

    const isValid = (errors) => {
        let errorsCount = 0;
        for (let key of Object.keys(errors)) if (errors[key] !== '') errorsCount++;
        return errorsCount === 0;
    };

    const validateForm = (name, value) => {
        let errorsMsg = '';

        const isUrl = (str) => /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(str);
        const isCharOnly = (str) => !/[^a-zA-Z]/.test(str);

        switch (name) {
            case "name":
                if (value === '') errorsMsg = 'Name is required';
                else if (!isCharOnly(value.replace(/\s/g, ''))) errorsMsg = 'Name can only contain alphabet chars';
                else if (value.length > 100) errorsMsg = 'Name can be a maximum of 100 characters';
                else errorsMsg = '';
                break;
            case "image_url":
                errorsMsg = (value !== "" && !isUrl(value)) ? "Input is not a url" : "";
                break;
            case "height_min":
                errorsMsg = (value <= 0) ? 'Min height must be greater than 0' : '';
                break;
            case "height_max":
                if (value <= 0) errorsMsg = 'Max height must be greater than 0';
                else if (value <= state.height_min) errorsMsg = 'Max height must be greater than min height';
                else errorsMsg = '';
                break;
            case "weight_min":
                errorsMsg = (value <= 0) ? 'Min weight must be greater than 0' : '';
                break;
            case "weight_max":
                if (value <= 0) errorsMsg = 'Max weight must be greater than 0';
                else if (value <= state.weight_min) errorsMsg = 'Max weight must be greater than min weight';
                else errorsMsg = '';
                break;
            case "lifespan_min":
                errorsMsg = (value <= 0) ? 'Min lifespan must be greater than 0' : '';
                break;
            case "lifespan_max":
                if (value <= 0) errorsMsg = 'Max lifespan must be greater than 0';
                else if (value <= state.lifespan_min) errorsMsg = 'Max lifespan must be greater than min lifespan';
                else errorsMsg = '';
                break;
            default:
                break;
        }

        return errorsMsg;
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
        const errors = { ...state.errors };

        errors.name = validateForm('name', state.name);
        errors.height_min = validateForm('height_min', state.height_min);
        errors.height_max = validateForm('height_max', state.height_max);
        errors.weight_min = validateForm('weight_min', state.weight_min);
        errors.weight_max = validateForm('weight_max', state.weight_max);
        errors.lifespan_min = validateForm('lifespan_min', state.lifespan_min);
        errors.lifespan_max = validateForm('lifespan_max', state.lifespan_max);
        errors.image_url = validateForm('image_url', state.image_url);

        setState({
            ...state,
            errors,
            disabled: !isValid(errors)
        });
    }, [state.name, state.height_min, state.height_max, state.weight_min, state.height_max, state.lifespan_min, state.lifespan_max, state.image_url]);

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
                    <p className={s.error}>{state.errors.name}</p>
                </div>
                <div>
                    <label className={sComponents.formLabel}>Image url</label>
                    <input className={sComponents.formInput} value={state.image_url} onChange={onChange} type="text" name="image_url" placeholder="Image url (optional)" />
                    <p className={s.error}>{state.errors.image_url}</p>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min height</label>
                        <input className={sComponents.formInput} value={state.height_min} onChange={onChange} type="number" name="height_min" placeholder="height_min" />
                        <p className={s.error}>{state.errors.height_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max height</label>
                        <input className={sComponents.formInput} value={state.height_max} onChange={onChange} type="number" name="height_max" placeholder="height_max" />
                        <p className={s.error}>{state.errors.height_max}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min weight</label>
                        <input className={sComponents.formInput} value={state.weight_min} onChange={onChange} type="number" name="weight_min" placeholder="weight_min" />
                        <p className={s.error}>{state.errors.weight_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max weight</label>
                        <input className={sComponents.formInput} value={state.weight_max} onChange={onChange} type="number" name="weight_max" placeholder="weight_max" />
                        <p className={s.error}>{state.errors.weight_max}</p>
                    </div>
                </div>
                <div className={s.row}>
                    <div>
                        <label className={sComponents.formLabel}>Min lifespan</label>
                        <input className={sComponents.formInput} value={state.lifespan_min} onChange={onChange} type="number" name="lifespan_min" placeholder="lifespan_min" />
                        <p className={s.error}>{state.errors.lifespan_min}</p>
                    </div>
                    <div>
                        <label className={sComponents.formLabel}>Max lifespan</label>
                        <input className={sComponents.formInput} value={state.lifespan_max} onChange={onChange} type="number" name="lifespan_max" placeholder="lifespan_max" />
                        <p className={s.error}>{state.errors.lifespan_max}</p>
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
                <button disabled={state.disabled} type="submit" className={sComponents.btnSm} >Save</button>
                <p className={s.error} style={{ marginTop: "1rem" }}>{state.requestError}</p>
            </form>
        </div>
    );
}