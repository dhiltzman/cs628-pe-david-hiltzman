import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useCities } from './src/context/CitiesContext';

const CitiesPage = () => {
  const { cities } = useCities();
  const { cityId } = useParams();

  return (
    <div className="cities-layout">
      <aside className="cities-sidebar">
        <div className="sidebar-header">
          <p className="sidebar-count">{cities.length} cities catalogued</p>
        </div>
        <ul className="city-list">
          {cities.map((city, i) => (
            <li key={city.id} style={{ animationDelay: `${i * 0.05}s` }} className="city-list-item">
              <NavLink
                to={`/cities/${city.id}`}
                className={({ isActive }) => `city-link ${isActive ? 'active' : ''}`}
              >
                <span className="city-link-name">{city.name}</span>
                <span className="city-link-country">{city.country}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="cities-main">
        {cityId ? (
          <Outlet />
        ) : (
          <div className="cities-welcome">
            <div className="welcome-icon">🌍</div>
            <h2 className="welcome-title">Select a City</h2>
            <p className="welcome-sub">Choose a city from the list to explore its details</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CitiesPage;