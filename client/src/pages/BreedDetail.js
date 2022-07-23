import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogDetail } from '../redux/actions';

import s from "./BreedDetail.module.css"
import ArrowNarrowLeft from "../components/Icons/ArrowNarrowLeft";
import DetailCard from "../components/DetailCard";

import ScaleIcon from "../components/Icons/Scale"
import HeartIcon from "../components/Icons/Heart"
import VariableIcon from "../components/Icons/Variable"

export default function BreedDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const breedDetail = useSelector(state => state.dogDetail);

    useEffect(() => {
        dispatch(fetchDogDetail(id));
    }, [id]);

    return (
        <div className={s.container}>
            <button className={s.backBtn} onClick={history.goBack}>
                <ArrowNarrowLeft style={{ height: "1rem" }}/>
                <span>Back</span>
            </button>
            <div className={s.dogDetailContainer}>
                <h1>{breedDetail.name}</h1>
                <p>{breedDetail.temperament}</p>
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
                <img src={breedDetail.image} alt={breedDetail.name} />
            </div>
        </div>
    );
}