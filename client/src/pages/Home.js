
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
import LoadingSpinner from "../components/LoadingSpinner";
import CloseIcon from "../components/Icons/Close";

export default function Home() {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const filteredDogs = useSelector(state => state.filteredDogs);
    const loading = useSelector(state => state.loading);
    const search = useSelector(state => state.search);

    useEffect(() => { dispatch(fetchAllDogs()); }, []);

    const clearSearch = () => {
        dispatch(fetchAllDogs());
    };

    return (
        <div className={s.breedsContainer}>
            <div className={s.filterContainer}>
                <div className={s.searchContainer}>
                    <h2>{search}</h2>
                    {search !== "All" &&
                        <button onClick={() => { clearSearch(); }}>
                            <CloseIcon style={{ height: "1rem" }} />
                        </button>
                    }
                </div>
                <p>{filteredDogs.length} results for search {search}</p>
                <div style={{ marginTop: "1rem" }}>
                    <SortButtons />
                    <OriginFilter />
                    <TemperamentFilter />
                </div>
            </div>
            {loading && <LoadingSpinner style={{ margin: '2rem 0' }} />}
            {(!loading && pagination.pageContent.length === 0) && <NotFound />}
            {(!loading && pagination.pageContent.length !== 0) &&
                <>
                    <ul className={s.cardsContainer}>
                        {pagination.pageContent.map((d, i) => <BreedCard key={i} breed={d} />)}
                    </ul>
                    <Pagination />
                </>
            }
        </div>
    );
}