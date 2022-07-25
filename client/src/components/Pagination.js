import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, setPage } from "../redux/actions";
import ArrowNarrowLeft from "./Icons/ArrowNarrowLeft";
import ArrowNarrowRight from "./Icons/ArrowNarrowRight";

import s from "./Pagination.module.css";

export default function Pagination() {
    const pagination = useSelector(state => state.pagination);
    const [pages, setPages] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const array = Array.from({ length: pagination.total }, (_, i) => i + 1);

        const chunkSize = 5;
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            if (chunk.includes(pagination.current)) {
                setPages(chunk);
                return;
            }
        }
    }, [pagination]);

    return (
        <div className={s.pagination}>
            <p>Showing page  <span style={{ fontWeight: "bold" }}>{pagination.current}</span> of <span style={{ fontWeight: "bold" }}>{pagination.total}</span></p>
            <div>
                <button
                    disabled={pagination.prev === null}
                    onClick={() => {
                        dispatch(prevPage());
                        window.scrollTo(0, 0);
                    }}
                >
                    <ArrowNarrowLeft style={{ height: "1rem" }} />
                    <span>Prev</span>
                </button>
                {
                    pages.map((p) => (
                        <button
                            key={p}
                            disabled={pagination.current === p}
                            className={`${pagination.current === p && s.active} ${s.numBtn}`}
                            onClick={() => {
                                dispatch(setPage(p));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {p}
                        </button>
                    ))
                }
                <button
                    disabled={pagination.next === null}
                    onClick={() => {
                        dispatch(nextPage());
                        window.scrollTo(0, 0);
                    }}
                >
                    <span>Next</span>
                    <ArrowNarrowRight style={{ height: "1rem" }} />
                </button>
            </div>
        </div>
    );
}