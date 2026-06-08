import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar">
          <div className="nav-brand">
            <span className="brand-icon">✦</span>
            <span className="brand-text">Recipe Finder</span>
          </div>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Recipes
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              + Add Recipe
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<RecipeList />}>
              <Route path="recipe/:id" element={<RecipeDetail />} />
            </Route>
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/edit/:id" element={<EditRecipe />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
