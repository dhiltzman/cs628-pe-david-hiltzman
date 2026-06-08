import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { api } from '../api';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getRecipe(id)
      .then(setRecipe)
      .catch(() => setError('Could not load recipe.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      await api.updateRecipe(id, data);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update recipe.');
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="state-container" style={{ minHeight: '50vh' }}>
      <div className="spinner" />
      <span>Loading recipe...</span>
    </div>
  );

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1>Edit Recipe</h1>
        <p>Update the details for <em>{recipe?.name}</em>.</p>
      </div>
      {recipe && (
        <RecipeForm
          initialData={recipe}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
        />
      )}
      {!recipe && error && <div className="error-msg">{error}</div>}
    </div>
  );
}
