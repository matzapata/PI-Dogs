import PropTypes from "prop-types"

export default function ArrowNarrowRight({ className="", style={} }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}


ArrowNarrowRight.protoTypes = {
    className: PropTypes.string,
    style: PropTypes.object
}