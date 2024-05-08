import {Outlet} from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "./MainLayout.module.css"

const MainLayout = () => {
    return (
        <>
            <NavBar/>
            <div className={styles.Line} />
            <Outlet/>
        </>
    )
}

export default MainLayout;