import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from './context/CitiesContext';

const AddCityPage = () => {
  const { addCity } = useCities();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', country: '', population: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'City name is required';
    if (!form.country.trim()) e.country = 'Country is required';
    if (!form.population || isNaN(Number(form.population))) e.population = 'Valid population required';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    const newCity = {
      id: Date.now().toString(),
      name: form.name,
      country: form.country,
      population: Number(form.population),
      founded: '', description: '', landmark: '', timezone: '', language: ''
    };
    addCity(newCity);
    navigate('/cities');
  };

  return (
    <div className="add-city-page">
      <h2 className="add-title">Add City</h2>
      <form className="city-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input className={`form-input ${errors.country ? 'error' : ''}`} type="text" name="country" value={form.country} onChange={handleChange} />
          {errors.country && <span className="form-error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Population</label>
          <input className={`form-input ${errors.population ? 'error' : ''}`} type="number" name="population" value={form.population} onChange={handleChange} />
          {errors.population && <span className="form-error">{errors.population}</span>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">Add City</button>
        </div>
      </form>
    </div>
  );
};

export default AddCityPage;