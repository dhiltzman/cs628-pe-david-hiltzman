import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { api } from '../api';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshList } = useOutletContext();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    api.getRecipe(id)
      .then(setRecipe)
      .catch(() => setError('Recipe not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${recipe.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await api.deleteRecipe(id);
      refreshList();
      navigate('/');
    } catch {
      setError('Failed to delete recipe.');
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="state-container">
      <div className="spinner" />
      <span>Loading recipe...</span>
    </div>
  );

  if (error) return (
    <div className="state-container">
      <div className="error-msg">{error}</div>
      <Link to="/" className="btn btn-secondary">Back to list</Link>
    </div>
  );

  if (!recipe) return null;

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : (recipe.ingredients || '').split('\n').filter(Boolean);

  return (
    <div className="recipe-detail-card">
      {recipe.category && (
        <span className="detail-category-tag">{recipe.category}</span>
      )}

      <h1 className="detail-title">{recipe.name}</h1>

      {recipe.description && (
        <p className="detail-subtitle">{recipe.description}</p>
      )}

      <div className="detail-meta-row">
        {recipe.prepTime && (
          <div className="meta-item">
            <span className="meta-label">Prep time</span>
            <span className="meta-value">{recipe.prepTime}</span>
          </div>
        )}
        {recipe.cookTime && (
          <div className="meta-item">
            <span className="meta-label">Cook time</span>
            <span className="meta-value">{recipe.cookTime}</span>
          </div>
        )}
        {recipe.servings && (
          <div className="meta-item">
            <span className="meta-label">Servings</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
        )}
        {recipe.difficulty && (
          <div className="meta-item">
            <span className="meta-label">Difficulty</span>
            <span className="meta-value">{recipe.difficulty}</span>
          </div>
        )}
      </div>

      {ingredients.length > 0 && (
        <div className="detail-section">
          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions && (
        <div className="detail-section">
          <h3>Instructions</h3>
          <p className="instructions-text">{recipe.instructions}</p>
        </div>
      )}

      {recipe.notes && (
        <div className="detail-section">
          <h3>Notes</h3>
          <p className="instructions-text">{recipe.notes}</p>
        </div>
      )}

      <div className="detail-actions">
        <Link to={`/edit/${recipe._id}`} className="btn btn-primary">
          ✏ Edit Recipe
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : '✕ Delete'}
        </button>
      </div>
    </div>
  );
}
