import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../redux/actions";
import ArrowNarrowLeft from "./Icons/ArrowNarrowLeft";
import ArrowNarrowRight from "./Icons/ArrowNarrowRight";

import s from "./Pagination.module.css";

export default function Pagination() {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();

    return (
        <div className={s.pagination}>
            <p>Showing page  <span style={{ fontWeight: "bold" }}>{pagination.current}</span> of <span style={{ fontWeight: "bold" }}>{pagination.total}</span></p>
            <div>
                <button
                    disabled={pagination.prev === null}
                    onClick={() => { dispatch(prevPage()); }}
                >
                    <ArrowNarrowLeft style={{ height: "1rem" }} />
                    <span>Prev</span>
                </button>
                <button
                    disabled={pagination.next === null}
                    onClick={() => { dispatch(nextPage()); }}
                >
                    <span>Next</span>
                    <ArrowNarrowRight style={{ height: "1rem" }} />
                </button>
            </div>
        </div>
    );
}