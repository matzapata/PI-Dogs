import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogsName } from "../redux/actions";


export default function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(fetchDogsName(search))
        setSearch('')
    }

    return (
        <form
            onSubmit={onSubmit}
        >
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}