import { useDispatch } from "react-redux";
import { filterDogsOrigin } from "../redux/actions";

import sComponents from "../styles/Components.module.css";

export default function TemperamentFilter() {
    const dispatch = useDispatch();

    const onChange = (e) => {
        dispatch(filterDogsOrigin(e.target.value))
    }

    return (
        <select className={sComponents.select} onChange={onChange}>
            <option value="all">All origins</option>
            <option value="dogApi">DogApi</option>
            <option value="user">User created</option>
        </select>
    );
}