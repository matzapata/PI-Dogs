import { useDispatch } from "react-redux";
import { sortDogsAZ, sortDogsWeightHL, sortDogsWeightLH, sortDogsZA } from "../redux/actions";

import s from "../styles/Components.module.css";

const N_AZ = "N_AZ";
const N_ZA = "N_ZA";
const W_HL = "W_HL";
const W_LH = "W_LH";

export default function SortButtons() {
    const dispatch = useDispatch();

    const onChange = (e) => {
        switch (e.target.value) {
            case N_AZ:
                dispatch(sortDogsAZ())                
                break;
            case N_ZA:
                dispatch(sortDogsZA())                
                break;
            case W_HL:
                dispatch(sortDogsWeightHL())
                break;
            case W_LH:
                dispatch(sortDogsWeightLH())
                break;
        
            default:
                break;
        }
    }

    return (
        <select className={s.select} onChange={onChange}>
            <option name="N_AZ" value={N_AZ}>Name AZ</option>
            <option name="N_ZA" value={N_ZA}>Name ZA</option>
            <option name="W_HL" value={W_HL}>Weight HL</option>
            <option name="W_LH" value={W_LH}>Weight LH</option>
        </select>
    );
}