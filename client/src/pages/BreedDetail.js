import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchDogDetail } from '../redux/actions'

export default function BreedDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const breedDetail = useSelector(state => state.dogDetail);

    useEffect(() => {
        dispatch(fetchDogDetail(id))
    }, [id]);

    return (
        <div>
            <p>id: {breedDetail.id}</p>
            <p>name: {breedDetail.name}</p>
            <p>image: {breedDetail.image}</p>
            <p>weight: {breedDetail.weight}</p>
            <p>temperament: {breedDetail.temperament}</p>
            <p>lifespan: {breedDetail.lifespan}</p>
            <p>height: {breedDetail.height}</p>
        </div>
    );
}