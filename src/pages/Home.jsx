import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]); // Stores the list of recipes
  const [search, setSearch] = useState("Chicken"); // Default search term
  const [loading, setLoading] = useState(false); // Loading state

  // The function to fetch data from the API
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await response.json();
      setRecipes(data.meals); // Save the meals to our state
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Run this function once when the page loads
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="w-full">
      
      {/* 1. Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          What are you craving today? 🍔
        </h1>
        <div className="flex justify-center max-w-md mx-auto gap-2">
          <input 
            type="text" 
            placeholder="Search (e.g. Pasta, Cake)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
          <button 
            onClick={fetchRecipes}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* 2. Recipe Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
           <p className="text-center text-xl">Loading delicious food...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes ? recipes.map((recipe) => (
              <div key={recipe.idMeal} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={recipe.strMealThumb} 
                  alt={recipe.strMeal} 
                  className="w-full h-48 object-cover"
                />
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
            )) : (
              <p className="text-center col-span-full text-gray-500">No recipes found. Try searching for "Pasta"!</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;