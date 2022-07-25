import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogDetail } from '../redux/actions';

import s from "./BreedDetail.module.css";
import DetailCard from "../components/DetailCard";

import ScaleIcon from "../components/Icons/Scale";
import HeartIcon from "../components/Icons/Heart";
import VariableIcon from "../components/Icons/Variable";
import BackButton from "../components/BackButton";

export default function BreedDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const breedDetail = useSelector(state => state.dogDetail);

    useEffect(() => {
        dispatch(fetchDogDetail(id));
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className={s.container}>
            <div style={{ margin: "2rem 0" }}>
                <BackButton />
            </div>
            <div className={s.dogDetailContainer}>
                <h1>{breedDetail.name}</h1>
                <ul className={s.temperamentList}>
                    {breedDetail.temperament?.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className={s.detailCardContainer}>
                    <DetailCard
                        icon={<ScaleIcon />}
                        label="Weight"
                        value={`${breedDetail.weight} kg`}
                    />
                    <DetailCard
                        icon={<VariableIcon />}
                        label="Height"
                        value={`${breedDetail.height} cm`}
                    />
                    <DetailCard
                        icon={<HeartIcon />}
                        label="Lifespan"
                        value={`${breedDetail.lifespan}`}
                    />
                </div>
                {breedDetail.image ?
                    <img src={breedDetail.image} alt={breedDetail.name} />
                    :
                    <p>No image provided</p>
                }
            </div>
        </div>
    );
}