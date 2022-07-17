import { useParams } from "react-router-dom";

export default function BreedDetail() {
    let { id } = useParams();

    return (
        <div>
            BreedDetail - {id}
        </div>
    );
}