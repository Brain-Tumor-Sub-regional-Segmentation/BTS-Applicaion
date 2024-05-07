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
import MainLayout from './pages/main-layout/MainLayout'
import Login from './pages/dummy-pages/Login';
import Patients from './pages/patient-list/PatientList';
import Patient from "./pages/patient/Patient";

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

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/patients/' element={<Patients/>} />
      <Route path='/dummy-login' element={<Login/>} />
      <Route path='/patient/:id' element={<Patient/>} />
      <Route path='/newPatient' element={<NewPatient />} />
      <Route path='/newProcess' element={ <div> add Process </div> } />
      <Route path='/process/:id' element={ <div> Process Page </div> } />
      <Route path='*' element={ <div> NotFound </div> } />
    </Routes>
  );
}
export default App;
