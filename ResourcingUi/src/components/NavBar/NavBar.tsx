import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
        <NavLink 
            className={styles.NavLink}
            style={({ isActive }) => ({
                color: isActive ? 'white' : 'grey'
              })}
            to="/"
        >
            Dashboard
        </NavLink>
        <NavLink 
            className={styles.NavLink}
            to="/jobs"
        >
            Jobs
        </NavLink>
        <NavLink 
            className={styles.NavLink}
            to="/people"
        >
            People
        </NavLink>
    </nav>
  )
}

export default NavBar;