import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './pages/main-layout/MainLayout'

import './App.css';

const App = () => {
  const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path={'/'} element={<MainLayout/>}>
            <Route index element={<div> home page </div>} />
            {/*<Route path={'/about'} element={ <About/> } />*/}

            {/*<Route path={'*'} element={ <NotFound/> } />*/}
          </Route>
      )
  );

  return <RouterProvider router={router}/>;
};

export default App;