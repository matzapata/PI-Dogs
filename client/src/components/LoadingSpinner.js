
import s from "./LoadingSpinner.module.css";

export default function LoadingSpinner( {className="", style={}}) {
    return (
        <div className={`${s.center} ${className}`} style={style}>
            <div className={s.loader}></div>
        </div>
    );
}