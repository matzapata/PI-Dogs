import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortDogsAZ, sortDogsWeightHL, sortDogsWeightLH, sortDogsZA } from "../redux/actions";

import s from "./SortButtons.module.css";

const SORT_AZ = "SORT_AZ";
const SORT_ZA = "SORT_ZA";
const SORT_W_HL = "SORT_W_HL";
const SORT_W_LH = "SORT_W_LH";

export default function SortButtons() {
    const dispatch = useDispatch();
    const [active, setActive] = useState(SORT_AZ);

    return (
        <div className={s.btnGroup}>
            <button
                className={`${(active === SORT_AZ) ? s.active : ''}`}
                onClick={() => {
                    dispatch(sortDogsAZ());
                    setActive(SORT_AZ);
                }}
            >
                Sort AZ
            </button>
            <button
                className={`${(active === SORT_ZA) ? s.active : ''}`}
                onClick={() => {
                    dispatch(sortDogsZA());
                    setActive(SORT_ZA);
                }}
            >
                Sort ZA
            </button>
            <button
                className={`${(active === SORT_W_HL) ? s.active : ''}`}
                onClick={() => {
                    dispatch(sortDogsWeightHL());
                    setActive(SORT_W_HL);
                }}
            >
                Sort Weight HL
            </button>
            <button
                className={`${(active === SORT_W_LH) ? s.active : ''}`}
                onClick={() => {
                    dispatch(sortDogsWeightLH());
                    setActive(SORT_W_LH);
                }}
            >
                Sort Weight LH
            </button>
        </div>
    );
}