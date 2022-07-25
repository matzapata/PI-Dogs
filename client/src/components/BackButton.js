import { useHistory } from "react-router-dom";
import ArrowNarrowLeft from "./Icons/ArrowNarrowLeft";

import s from "./BackButton.module.css";

export default function BackButton() {
    const history = useHistory();

    return (
        <button className={s.backBtn} onClick={history.goBack}>
            <ArrowNarrowLeft style={{ height: "1rem" }} />
            <span>Back</span>
        </button>
    );
}