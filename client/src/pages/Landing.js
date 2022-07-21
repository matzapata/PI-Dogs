import { Link } from "react-router-dom";
import s from "./Landing.module.css";
import background from "../images/landing-bg.jpg";

export default function Landing() {
    return (
        <div style={{ height: "100vh", padding: "1rem" }}>
            <div className={s.container} style={{ backgroundImage: `url(${background})` }}>
                <div className={s.header}>
                    <h1 className={s.title}>Dogs</h1>
                    <Link to="/breeds" className={s.exploreLink}>
                        <span>Explore dog breeds</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}