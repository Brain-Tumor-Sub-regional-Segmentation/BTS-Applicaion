import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './pages/main-layout/MainLayout'
import Login from './pages/dummy-pages/Login';
import Patients from './pages/patient-list/PatientList';

import './App.css';

const App = () => {
  const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<div> home page </div>} />
              <Route path={'/patients/'} element={ <Patients/> } />
              <Route path={'/dummy-login'} element={ <Login/> } />
              <Route path={'/patient/:id'} element={ <div> patient page </div> } />
              <Route path={'/newPatient'} element={ <div> add Patient </div> } />
              {/*<Route path={'/about'} element={ <About/> } />*/}

              {/*<Route path={'*'} element={ <NotFound/> } />*/}
          </Route>
      )
  );

  return <RouterProvider router={router}/>;
};

export default App;