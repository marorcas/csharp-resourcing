import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useContext } from "react";
import { LinkSelectionContext } from "../../contexts/LinkSelectionContextProvider/LinkSelectionContextProvider";

const NavBar = () => {
    const linkContext = useContext(LinkSelectionContext);
    if (linkContext === undefined) {
        throw new Error("Something went wrong");
    }
    const { selectedLink, setSelectedLink } = linkContext;

    return (
        <nav className={styles.NavBar}>
            <NavLink 
                className={`${styles.NavLink} ${selectedLink === 'dashboard' ? styles.SelectedLink : ''}`}
                onClick={() => setSelectedLink('dashboard')}
                to="/"
            >
                Dashboard
            </NavLink>
            <NavLink 
                className={`${styles.NavLink} ${selectedLink === 'jobs' ? styles.SelectedLink : ''}`}
                onClick={() => setSelectedLink('jobs')}
                to="/jobs"
            >
                Jobs
            </NavLink>
            <NavLink 
                className={`${styles.NavLink} ${selectedLink === 'people' ? styles.SelectedLink : ''}`}
                onClick={() => setSelectedLink('people')}
                to="/people"
            >
                People
            </NavLink>
        </nav>
    )
}

export default NavBar;