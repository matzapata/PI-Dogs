import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperaments, filterDogsTemperament } from "../redux/actions";

import sComponents from "../styles/Components.module.css";
import s from "./TemperamentFilter.module.css";
import CloseIcon from "./Icons/Close";

export default function TemperamentFilter() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [displayBtn, setDisplayBtn] = useState(false);
    const [filters, setFilters] = useState([]);
    const [select, setSelect] = useState("all");

    useEffect(() => {
        dispatch(fetchTemperaments());
    }, []);

    const onChange = (e) => {
        if (e.target.value === 'all') {
            setDisplayBtn(false);
            setFilters([]);
            dispatch(filterDogsTemperament([]));
        }
        else setDisplayBtn(true);
        setSelect(e.target.value);
    };

    const addFilter = () => {
        if (!filters.find(f => f === select)) {
            setFilters([...filters, select]);
            dispatch(filterDogsTemperament([...filters, select]));
        }
    };
    
    const removeFilter = (temperament) => {
        const newFilters = filters.filter(f => f !== temperament)
        setFilters(newFilters)
        dispatch(filterDogsTemperament(newFilters));
        if (newFilters.length === 0) {
            setSelect('all')
            setDisplayBtn(false);
        }
    }

    return (
        <div className={s.container}>
            <div style={{ display: "flex" }}>
                <select className={sComponents.select} onChange={onChange} value={select}>
                    <option value="all">All temperaments</option>
                    {temperaments.map((t, i) => <option key={i} value={t.name}>{t.name}</option>)}
                </select>
                {displayBtn && <button onClick={() => addFilter()} className={sComponents.btnSm}>Add</button>}
            </div>
            <ul className={s.temperamentsList}>
                {filters.map((f, i) =>
                    <li key={i} className={s.temperament}>
                        <span>{f}</span>
                        <button type="button" onClick={() => removeFilter(f)}>
                            <CloseIcon />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}