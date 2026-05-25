import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './context/CitiesContext';
import Navbar from './components/Navbar';
import CitiesPage from './CitiesPage';
import CityDetails from './CityDetails';
import AddCityPage from './AddCityPage';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/cities" replace />} />
          <Route path="/cities" element={<CitiesPage />}>
            <Route path=":cityId" element={<CityDetails />} />
          </Route>
          <Route path="/add" element={<AddCityPage />} />
          <Route path="*" element={<Navigate to="/cities" replace />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;