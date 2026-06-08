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
    try {
      const created = await api.createRecipe(data);
      navigate(`/recipe/${created._id}`);
    } catch (err) {
      setError(err.message || 'Failed to save.');
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <h1>Add Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}