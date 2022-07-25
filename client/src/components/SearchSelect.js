import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../hooks/useClickOutside";

import sComponents from "../styles/Components.module.css"
import s from "./SearchSelect.module.css";

export default function SearchSelect({ options, setSelected }) {
    const [search, setSearch] = useState(options[0]?.name);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const clickOutsideNode = useClickOutside(() => closeOptions(false));
    
    const closeOptions = (selected) => {
        if (!selected && open) {
            setSearch(options[0].name)
            setSelected(options[0].value)
        }
        setOpen(false);
    }

    useEffect(() => {
        if (search === '') setResults(options);
        else setResults(options.filter(o => o.name.toLowerCase().includes(search.toLocaleLowerCase())));
    }, [search, options]);

    useEffect(() => {
        setSelected(options[0].value)
    }, [])

    return (
        <div style={{ display: "inline-block" }} ref={clickOutsideNode}>
            <input
                type="text"
                value={search}
                className={sComponents.formInput}
                placeholder="Search temperaments"
                onFocus={() => {
                    setSearch('');
                    setOpen(true);
                }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={s.container} >
                <ul className={`${open ? '' : s.hidden} ${s.optionsContainer}`}>
                    {(results.length > 0) ?
                        results.map(o => (
                            <li
                                key={o.name}
                                className={s.option}
                                onClick={() => {
                                    setSelected(o.value);
                                    setSearch(o.name);
                                    closeOptions(true);
                                }}
                            >
                                {o.name}
                            </li>
                        ))
                        :
                        <li className={s.option}>No results</li>
                    }
                </ul>
            </div>
        </div>
    );
}

SearchSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.any
    })),
    setSelected: PropTypes.func
};

