import PropTypes from "prop-types"
import s from './DetailCard.module.css';

export default function DetailCard({ icon, label, value }) {
    return (
        <div className={s.container}>
            <div className={s.iconContainer}>
                {icon}
            </div>
            <div className={s.dataContainer}>
                <h2>{label}</h2>
                <p>{value}</p>
            </div>
        </div>
    )
}

DetailCard.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    value: PropTypes.string
}