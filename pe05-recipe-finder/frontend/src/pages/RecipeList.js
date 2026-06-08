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
      .catch(() => setError('Could not load recipes.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const refreshList = () => api.getRecipes().then(setRecipes).catch(() => {});

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">{recipes.length} recipe{recipes.length !== 1 ? 's' : ''}</div>
        <div className="search">
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {loading && <div className="spinner" />}
        {error && <div className="error" style={{ margin: '1rem' }}>{error}</div>}
        {!loading && filtered.length === 0 && (
          <div className="empty">{search ? 'No matches.' : 'No recipes yet.'}</div>
        )}
        {filtered.map(r => (
          <Link
            key={r._id}
            to={`/recipe/${r._id}`}
            className={`recipe-item${activeId === r._id ? ' active' : ''}`}
          >
            {r.name}
            <small>{[r.category, r.cookTime].filter(Boolean).join(' · ')}</small>
          </Link>
        ))}
      </aside>

      <div className="panel">
        <Outlet context={{ refreshList }} />
        {!activeId && <div className="empty">Select a recipe or add a new one.</div>}
      </div>
    </div>
  );
}