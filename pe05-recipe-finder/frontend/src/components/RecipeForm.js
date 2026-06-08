import React, { useState } from 'react';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Soup', 'Salad', 'Drink', 'Other'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function RecipeForm({ initialData = {}, onSubmit, submitting, error }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    category: initialData.category || '',
    prepTime: initialData.prepTime || '',
    cookTime: initialData.cookTime || '',
    servings: initialData.servings || '',
    difficulty: initialData.difficulty || '',
    instructions: initialData.instructions || '',
    notes: initialData.notes || '',
  });
  const [ingredients, setIngredients] = useState(
    Array.isArray(initialData.ingredients)
      ? initialData.ingredients
      : (initialData.ingredients || '').split('\n').filter(Boolean)
  );
  const [ingInput, setIngInput] = useState('');

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const addIng = () => {
    const val = ingInput.trim();
    if (val && !ingredients.includes(val)) {
      setIngredients(prev => [...prev, val]);
      setIngInput('');
    }
  };

  return (
    <form className="recipe-form" onSubmit={e => { e.preventDefault(); onSubmit({ ...form, ingredients }); }}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Name *</label>
        <input value={form.name} onChange={set('name')} required placeholder="Recipe name" />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input value={form.description} onChange={set('description')} placeholder="Short description" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select value={form.category} onChange={set('category')}>
            <option value="">Select...</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Difficulty</label>
          <select value={form.difficulty} onChange={set('difficulty')}>
            <option value="">Select...</option>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Prep Time</label>
          <input value={form.prepTime} onChange={set('prepTime')} placeholder="e.g. 15 mins" />
        </div>
        <div className="form-group">
          <label>Cook Time</label>
          <input value={form.cookTime} onChange={set('cookTime')} placeholder="e.g. 30 mins" />
        </div>
      </div>

      <div className="form-group" style={{ maxWidth: 180 }}>
        <label>Servings</label>
        <input value={form.servings} onChange={set('servings')} placeholder="e.g. 4" />
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        <div className="ing-row">
          <input
            value={ingInput}
            onChange={e => setIngInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addIng(); } }}
            placeholder="Add ingredient, press Enter"
          />
          <button type="button" className="btn btn-secondary" onClick={addIng}>Add</button>
        </div>
        {ingredients.length > 0 && (
          <div className="tags">
            {ingredients.map((ing, i) => (
              <span key={i} className="tag">
                {ing}
                <button type="button" onClick={() => setIngredients(p => p.filter((_, j) => j !== i))}>x</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Instructions *</label>
        <textarea value={form.instructions} onChange={set('instructions')} required style={{ minHeight: 160 }} />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea value={form.notes} onChange={set('notes')} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}