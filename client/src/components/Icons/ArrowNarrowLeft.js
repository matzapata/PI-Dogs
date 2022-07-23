import PropTypes from "prop-types"

export default function ArrowNarrowLeft({ className = "", style = {} }) {
    return (
        <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
    );
}

ArrowNarrowLeft.protoTypes = {
    className: PropTypes.string,
    style: PropTypes.object
}