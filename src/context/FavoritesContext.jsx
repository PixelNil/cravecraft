import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 1. Load saved favorites from browser memory on startup
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('craveCraftFavorites')) || [];
    setFavorites(saved);
  }, []);

  // 2. Save to browser memory whenever the list changes
  useEffect(() => {
    localStorage.setItem('craveCraftFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Add function
  const addToFavorites = (recipe) => {
    // Only add if it's not already there
    if (!favorites.find(f => f.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  // 4. Remove function
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(f => f.idMeal !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};