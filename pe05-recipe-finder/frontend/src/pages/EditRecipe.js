import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { api } from '../api';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getRecipe(id).then(setRecipe).catch(() => setError('Could not load recipe.'));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.updateRecipe(id, data);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update.');
      setSubmitting(false);
    }
  };

  if (!recipe && !error) return <div className="spinner" />;

  return (
    <div className="form-page">
      <h1>Edit Recipe</h1>
      {recipe && <RecipeForm initialData={recipe} onSubmit={handleSubmit} submitting={submitting} error={error} />}
      {!recipe && error && <div className="error">{error}</div>}
    </div>
  );
}