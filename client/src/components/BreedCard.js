import { Link } from "react-router-dom";
import s from "./BreedCard.module.css";
import PropTypes from 'prop-types';

import ArrowNarrowRight from "./Icons/ArrowNarrowRight";
import placeholderDog from "../images/dog-placeholder.png";

export default function BreedCard({ breed }) {
    return (
        <div className={s.container}>
            <img className={s.breedImage} src={(breed.image) ? breed.image : placeholderDog} alt={breed.name} />
            <div className={s.infoContainer}>
                <Link className={s.heading} to={`/breeds/${breed.id}`}>
                    <h1>{breed.name}</h1>
                </Link>
                <p>Weight: {breed.weight} kg</p>
                <p>{breed.temperament?.join(', ')}</p>
                <Link className={s.goBtn} to={`/breeds/${breed.id}`}>
                    <span>Go</span>
                    <ArrowNarrowRight style={{ height: "1rem" }} />
                </Link>
            </div>
        </div>
    );
}

BreedCard.propTypes = {
    breed: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        temperament: PropTypes.array,
        image: PropTypes.string
    })
};