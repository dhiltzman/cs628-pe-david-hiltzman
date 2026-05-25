import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useCities } from './context/CitiesContext';

const CitiesPage = () => {
  const { cities } = useCities();
  const { cityId } = useParams();

  return (
    <div className="cities-list-card">
      <h2 className="cities-list-title">Cities List</h2>
      <ul className="city-list">
        {cities.map((city) => (
          <li key={city.id} className="city-list-item">
            <Link to={`/cities/${city.id}`} className="city-link">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
      {cityId && <Outlet />}
    </div>
  );
};

export default CitiesPage;