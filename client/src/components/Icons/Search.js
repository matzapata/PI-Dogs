
import PropTypes from "prop-types";

export default function Search({ className = "", style = {} }) {
    return (
        <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}

Search.protoTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};
