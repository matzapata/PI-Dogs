import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllDogs } from "../redux/actions";
import PawIcon from "./Icons/Paw";

import s from "./NotFound.module.css";

export default function NotFound() {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(fetchAllDogs())
        history.push('/breeds');
    }

    return (
        <div className={s.container}>
            <PawIcon className={s.icon} />
            <h2>Oh no!</h2>
            <p>Couldn't find any match.</p>
            <button onClick={onClick}>Back home</button>
        </div>
    );
}