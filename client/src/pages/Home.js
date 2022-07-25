
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs } from "../redux/actions";

import BreedCard from "../components/BreedCard";
import Pagination from "../components/Pagination";
import SortButtons from "../components/SortButtons";

import s from "./Home.module.css";
import TemperamentFilter from "../components/TemperamentFilter";
import OriginFilter from "../components/OriginFilter";
import NotFound from "../components/NotFound";

export default function Home() {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const filteredDogs = useSelector(state => state.filteredDogs);
    const search = useSelector(state => state.search)

    useEffect(() => { dispatch(fetchAllDogs()); }, []);

    return (
        <div className={s.breedsContainer}>
            <div className={s.filterContainer}>
                <h2>{search}</h2>
                <p>{filteredDogs.length} results for search {search}</p>
                <div style={{ marginTop: "1rem" }}>
                    <SortButtons />
                    <TemperamentFilter />
                    <OriginFilter />
                </div>
            </div>
            {pagination.pageContent.length === 0 ?
                <NotFound />
                :
                <ul>
                    {pagination.pageContent.map((d, i) => <BreedCard key={i} breed={d} />)}
                </ul>
            }
            <Pagination />
        </div>
    );
}