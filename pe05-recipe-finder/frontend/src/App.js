import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RecipeList from './pages/RecipeList';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <nav>
        <span className="brand">Recipe Finder</span>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <NavLink to="/" end>Recipes</NavLink>
          <NavLink to="/add">+ Add</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeList />}>
          <Route path="recipe/:id" element={<RecipeDetail />} />
        </Route>
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}