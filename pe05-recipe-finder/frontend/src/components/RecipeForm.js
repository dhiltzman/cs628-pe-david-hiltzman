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

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const addIngredient = () => {
    const val = ingInput.trim();
    if (val && !ingredients.includes(val)) {
      setIngredients(prev => [...prev, val]);
      setIngInput('');
    }
  };

  const removeIngredient = (idx) =>
    setIngredients(prev => prev.filter((_, i) => i !== idx));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addIngredient(); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, ingredients });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Recipe Name *</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Grandma's Tomato Soup"
          value={form.name}
          onChange={set('name')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description</label>
        <input
          id="description"
          type="text"
          placeholder="A brief overview of the dish"
          value={form.description}
          onChange={set('description')}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category} onChange={set('category')}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" value={form.difficulty} onChange={set('difficulty')}>
            <option value="">Select difficulty</option>
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time</label>
          <input id="prepTime" type="text" placeholder="e.g. 15 mins" value={form.prepTime} onChange={set('prepTime')} />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time</label>
          <input id="cookTime" type="text" placeholder="e.g. 30 mins" value={form.cookTime} onChange={set('cookTime')} />
        </div>
      </div>

      <div className="form-group" style={{ maxWidth: 220 }}>
        <label htmlFor="servings">Servings</label>
        <input id="servings" type="text" placeholder="e.g. 4" value={form.servings} onChange={set('servings')} />
      </div>

      {/* Ingredients */}
      <div className="form-group">
        <label>Ingredients</label>
        <div className="ingredient-input-row">
          <input
            type="text"
            placeholder="Add ingredient and press Enter"
            value={ingInput}
            onChange={e => setIngInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="btn btn-secondary" onClick={addIngredient}>Add</button>
        </div>
        {ingredients.length > 0 && (
          <div className="ingredients-tags">
            {ingredients.map((ing, i) => (
              <span key={i} className="ingredient-tag">
                {ing}
                <button type="button" onClick={() => removeIngredient(i)} aria-label="Remove">✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions *</label>
        <textarea
          id="instructions"
          placeholder="Step-by-step cooking instructions..."
          value={form.instructions}
          onChange={set('instructions')}
          style={{ minHeight: 180 }}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes / Tips</label>
        <textarea
          id="notes"
          placeholder="Optional tips, substitutions, storage instructions..."
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Recipe'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
