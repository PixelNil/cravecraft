import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Favorite Recipes ❤️
      </h1>

      {favorites.length === 0 ? (
        // Empty State (If nothing is saved)
        <div className="text-center mt-20">
          <p className="text-2xl text-gray-400 mb-4">You haven't saved any recipes yet.</p>
          <Link to="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
            Go Find Food! 🍔
          </Link>
        </div>
      ) : (
        // Grid State (If items exist)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
              
              {/* Image */}
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="w-full h-48 object-cover"
              />
              
              {/* Remove Button (X) */}
              <button 
                onClick={() => removeFromFavorites(recipe.idMeal)}
                className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-50"
                title="Remove from favorites"
              >
                ✕
              </button>

              <div className="p-4">
                <span className="text-xs font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded-full uppercase">
                  {recipe.strCategory}
                </span>
                <h2 className="text-lg font-bold text-gray-800 mt-2 truncate">
                  {recipe.strMeal}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {recipe.strArea} Cuisine
                </p>
                <Link 
                  to={`/recipe/${recipe.idMeal}`} 
                  className="block w-full text-center bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;