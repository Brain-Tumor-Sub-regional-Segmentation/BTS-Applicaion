import {Outlet} from "react-router-dom";
// import NavBar from "../../components/NavBar";

const MainLayout = () => {
    return (
        <>
            {/*<NavBar firstLetter="A"/>*/}
            <Outlet/>
        </>
    )
}

export default MainLayout;