import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllDogs, fetchDogsName } from "../redux/actions";
import SearchIcon from "./Icons/Search";
import CloseIcon from "./Icons/Close";

import s from "./SearchBar.module.css";
import sComponents from "../styles/Components.module.css";

export default function SearchBar() {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (search !== "") {
            dispatch(fetchDogsName(search));
            history.push('/breeds');
        }
    };

    const clearSearch = () => {
        setSearch("");
        dispatch(fetchAllDogs());
        history.push('/breeds');
    };

    return (
        <form
            onSubmit={onSubmit}
            className={s.searchForm}
        >
            <div className={s.inputContainer}>
                <SearchIcon className={s.searchIcon} />
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search !== "" &&
                    <button type="button" onClick={clearSearch} >
                        <CloseIcon className={s.closeIcon} />
                    </button>
                }
            </div>
            <button className={sComponents.btnSm} type="submit">Search</button>
        </form>
    );
}