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

  useEffect(() => {
    setLoading(true);
    api.getRecipe(id)
      .then(setRecipe)
      .catch(() => setError('Recipe not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${recipe.name}"?`)) return;
    try {
      await api.deleteRecipe(id);
      refreshList();
      navigate('/');
    } catch {
      setError('Failed to delete.');
    }
  };

  if (loading) return <div className="spinner" />;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return null;

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : (recipe.ingredients || '').split('\n').filter(Boolean);

  return (
    <div>
      {recipe.category && <small style={{ color: 'var(--muted)' }}>{recipe.category}</small>}
      <h1 className="detail-title">{recipe.name}</h1>
      {recipe.description && <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>{recipe.description}</p>}

      <div className="meta">
        {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
        {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
        {recipe.servings && <span>Serves: {recipe.servings}</span>}
        {recipe.difficulty && <span>{recipe.difficulty}</span>}
      </div>

      {ingredients.length > 0 && (
        <div className="section">
          <h3>Ingredients</h3>
          <ul className="ingredients">
            {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
      )}

      {recipe.instructions && (
        <div className="section">
          <h3>Instructions</h3>
          <p className="instructions">{recipe.instructions}</p>
        </div>
      )}

      {recipe.notes && (
        <div className="section">
          <h3>Notes</h3>
          <p className="instructions">{recipe.notes}</p>
        </div>
      )}

      <div className="actions">
        <Link to={`/edit/${recipe._id}`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}