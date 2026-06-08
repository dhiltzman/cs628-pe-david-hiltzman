import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { api } from '../api';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id: activeId } = useParams();

  useEffect(() => {
    api.getRecipes()
      .then(setRecipes)
      .catch(() => setError('Could not load recipes. Is the server running?'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="recipe-list-layout">
      {/* ── Left panel ── */}
      <aside className="list-panel">
        <div className="list-panel-header">
          <h1>Recipes</h1>
          <p>{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} collected</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="recipe-items">
          {loading && (
            <div className="state-container" style={{ minHeight: '20vh' }}>
              <div className="spinner" />
            </div>
          )}

          {error && <div className="error-msg" style={{ margin: '1rem' }}>{error}</div>}

          {!loading && !error && filtered.length === 0 && (
            <div className="empty-list">
              <div className="empty-list-icon">🍽</div>
              <p>{search ? 'No recipes match your search.' : 'No recipes yet. Add one!'}</p>
            </div>
          )}

          {filtered.map(recipe => (
            <Link
              key={recipe._id}
              to={`/recipe/${recipe._id}`}
              className={`recipe-list-item${activeId === recipe._id ? ' active-recipe' : ''}`}
            >
              <span className="recipe-list-item-name">{recipe.name}</span>
              <div className="recipe-list-item-meta">
                {recipe.category && <span className="tag-pill">{recipe.category}</span>}
                {recipe.cookTime && <span>{recipe.cookTime}</span>}
                {recipe.servings && <span>{recipe.servings} servings</span>}
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* ── Right panel: nested route renders here ── */}
      <div className="detail-panel">
        <Outlet context={{ refreshList: () => {
          api.getRecipes().then(setRecipes).catch(() => {});
        }}} />

        {!activeId && (
          <div className="detail-empty">
            <div className="detail-empty-icon">🥘</div>
            <h2>Select a recipe</h2>
            <p>Pick one from the list, or add a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
