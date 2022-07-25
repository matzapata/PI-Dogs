import { Link } from "react-router-dom";
import DogIcon from "./Icons/Dog";
import PropTypes from "prop-types"

import s from "./Logo.module.css";

export default function Logo({ className="", style={} }) {
    return (
        <Link to="/" className={className} style={style}>
            <div className={s.container}>
                <DogIcon className={s.icon} />
            </div>
        </Link>
    );
}

Logo.protoTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

