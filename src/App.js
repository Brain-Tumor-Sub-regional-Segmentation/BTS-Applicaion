import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import NewPatient from "./pages/new-patient/NewPatient"
import Patients from './pages/patient-list/PatientList';
import Patient from "./pages/patient/Patient";
import SignUp from "./pages/sign-up/SignUp"
import MainLayout from "./pages/main-layout/MainLayout";

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
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/home' element={<MainLayout/>}>
        <Route path='/home/patients' element={<Patients/>} />
        <Route path='/home/patient/:id' element={<Patient/>} />
        <Route path='/home/newPatient' element={<NewPatient />} />
        <Route path='/home/newProcess' element={ <div> add Process </div> } />
        <Route path='/home/process/:id' element={ <div> Process Page </div> } />
      </Route>
      <Route path='*' element={ <div> NotFound </div> } />
    </Routes>
  );
}
export default App;