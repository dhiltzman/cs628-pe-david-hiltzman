import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCities } from './context/CitiesContext';

const CityDetails = () => {
  const { cityId } = useParams();
  const { getCityById } = useCities();

  if (!cityId) return <Navigate to="/cities" replace />;

  const city = getCityById(cityId);
  if (!city) return <p>City not found</p>;

  return (
    <div className="city-details">
      <h2 className="city-name">{city.name} Details</h2>
      <p className="city-country">Country: {city.country}</p>
      <div className="city-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Population</span>
          <span className="stat-value">{city.population.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;