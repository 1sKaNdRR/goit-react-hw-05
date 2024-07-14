import { NavLink } from "react-router-dom"
import clsx from "clsx"
import css from "./Navigation.module.css"

const makeNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};


export default function Navigation() {
    return (
        <header className={css.container}>
            <nav className={css.navigationWrap}>
                <NavLink to="/" className={makeNavLinkClass}>HOME</NavLink>
                <NavLink to="/movies" className={makeNavLinkClass}>MOVIES</NavLink>
            </nav>
        </header>
    )
}
