import { Link } from "react-router-dom";
import s from "./Landing.module.css";
import background from "../images/landing-bg.jpg";
import ArrowNarrowRight from "../components/Icons/ArrowNarrowRight";

export default function Landing() {
    return (
        <div style={{ height: "100vh", padding: "0.7rem" }}>
            <div data-testid="background" className={s.container} style={{ backgroundImage: `url(${background})` }}>
                <div className={s.header}>
                    <h1 className={s.title}>Dogs</h1>
                    <Link to="/breeds" className={s.exploreLink}>
                        <span>Explore dog breeds</span>
                        <ArrowNarrowRight style={{ height: "1rem" }}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}