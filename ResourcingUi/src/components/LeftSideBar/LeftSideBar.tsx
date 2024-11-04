import NavBar from "../NavBar/NavBar";
import styles from "./LeftSideBar.module.scss";

const LeftSideBar = () => {
  return (
    <div className={styles.LeftSideBar}>
        <div className={styles.ProfileInfo}>
            Profile Info
        </div>
        <div className={styles.NavBarContainer}>
            <NavBar/>
        </div>
    </div>
  )
}

export default LeftSideBar;