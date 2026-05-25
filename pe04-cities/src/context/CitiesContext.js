import React, { createContext, useContext, useState } from 'react';

const initialCities = [
  { id: '1', name: 'Tokyo', country: 'Japan', population: 13960000, founded: '1457', description: 'Tokyo is the capital and most populous city of Japan. A vibrant metropolis blending ultramodern skyscrapers with traditional temples and gardens.', landmark: 'Tokyo Tower', timezone: 'UTC+9', language: 'Japanese' },
  { id: '2', name: 'Paris', country: 'France', population: 2161000, founded: '250 BC', description: 'Paris, the City of Light, is the capital of France and a global center for art, fashion, gastronomy, and culture.', landmark: 'Eiffel Tower', timezone: 'UTC+1', language: 'French' },
  { id: '3', name: 'New York', country: 'United States', population: 8336817, founded: '1624', description: 'New York City is the most populous city in the United States. It is a global financial, cultural, and entertainment hub.', landmark: 'Statue of Liberty', timezone: 'UTC-5', language: 'English' },
  { id: '4', name: 'Rio de Janeiro', country: 'Brazil', population: 6748000, founded: '1565', description: 'Rio de Janeiro is a breathtaking coastal city renowned for its stunning natural beauty, vibrant Carnival festival, and iconic landmarks.', landmark: 'Christ the Redeemer', timezone: 'UTC-3', language: 'Portuguese' },
  { id: '5', name: 'Cairo', country: 'Egypt', population: 10000000, founded: '969 AD', description: "Cairo is the capital of Egypt and one of the world's oldest cities, home to ancient wonders that have stood for millennia.", landmark: 'Great Pyramid of Giza', timezone: 'UTC+2', language: 'Arabic' },
];

const CitiesContext = createContext(undefined);

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState(initialCities);
  const addCity = (city) => setCities(prev => [...prev, city]);
  const getCityById = (id) => cities.find(c => c.id === id);

  return (
    <CitiesContext.Provider value={{ cities, addCity, getCityById }}>
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const ctx = useContext(CitiesContext);
  if (!ctx) throw new Error('useCities must be used within CitiesProvider');
  return ctx;
};