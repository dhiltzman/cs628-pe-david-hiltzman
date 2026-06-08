import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { api } from '../api';

export default function AddRecipe() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      const created = await api.createRecipe(data);
      navigate(`/recipe/${created._id}`);
    } catch (err) {
      setError(err.message || 'Failed to save recipe.');
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1>Add a Recipe</h1>
        <p>Share a new dish with your collection.</p>
      </div>
      <RecipeForm onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}
