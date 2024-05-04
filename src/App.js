import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewPatient from "./pages/NewPatient"
import Dummy from "./Dummy";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/landingpage":
        title = "BTS";
        metaDescription = "Brain Tumor Segmentation";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  // if (pathname === "/")
  //   return  <Navigate to="/landingpage"></Navigate>

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/logIn" element={<Dummy/>} />
      <Route path="/signUp" element={<Dummy/>} />
      <Route path="/newPatient" element={<NewPatient />} />
    </Routes>
  );
}
export default App;
