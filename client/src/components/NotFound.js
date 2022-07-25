import PawIcon from "./Icons/Paw";

import s from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={s.container}>
            <PawIcon className={s.icon} />
            <h2>Oh no!</h2>
            <p>Couldn't any match.</p>
        </div>
    );
}