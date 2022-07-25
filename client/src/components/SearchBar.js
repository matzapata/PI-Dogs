import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDogsName } from "../redux/actions";
import s from "./SearchBar.module.css"


export default function SearchBar() {
    const history = useHistory()
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(fetchDogsName(search))
        history.push('/breeds')
    }

    return (
        <form
            onSubmit={onSubmit}
            className={s.searchForm}
        >
            <input
                type="text"
                value={search}
                className={s.formInput}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className={s.btnSm} type="submit">Search</button>
        </form>
    );
}