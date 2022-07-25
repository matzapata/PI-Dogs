import PropTypes from "prop-types";

export default function Close({ className = "", style = {} }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}


Close.protoTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};