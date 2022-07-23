// - [ ] Botones/Opciones para filtrar por:
//   - Temperamento
//   - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs } from "../redux/actions";

import SearchBar from "../components/SearchBar";
import BreedCard from "../components/BreedCard";
import Pagination from "../components/Pagination";
import SortButtons from "../components/SortButtons";

import s from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    useEffect(() => { dispatch(fetchAllDogs()); }, []);

    return (
        <div className={s.breedsContainer}>
            <div className={s.searchContainer}>
                <SearchBar />
                <SortButtons />
            </div>
            <ul>
                {pagination.pageContent.map((d, i) => <BreedCard key={i} breed={d} />)}
            </ul>
            <Pagination />
        </div>
    );
}