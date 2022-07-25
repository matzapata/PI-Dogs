import { Link } from "react-router-dom";
import Logo from "./Logo";

import s from "./NavBar.module.css"
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <nav className={s.container}>
            <div className={s.leftContainer}>
                <Logo />
                <ul className={s.navItems}>
                    <li>
                        <Link to="/breeds">Explore</Link>
                    </li>
                    <li>
                        <Link to="/breeds/new">Create</Link>
                    </li>
                </ul>
            </div>
            <div>
                <SearchBar />
            </div>
        </nav>
    )
}