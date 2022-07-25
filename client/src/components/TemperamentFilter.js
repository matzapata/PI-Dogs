import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperaments, filterDogsTemperament } from "../redux/actions";

import sComponents from "../styles/Components.module.css";

export default function TemperamentFilter() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    useEffect(() => {
        dispatch(fetchTemperaments());
    }, []);

    const onChange = (e) => {
        dispatch(filterDogsTemperament(e.target.value))
    }

    return (
            <select className={sComponents.select} onChange={onChange}>
                <option value="all">All temperaments</option>
                {temperaments.map((t, i) => <option key={i} value={t.name}>{t.name}</option>)}
            </select>
    );
}