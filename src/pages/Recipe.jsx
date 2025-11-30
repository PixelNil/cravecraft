import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext'; // <--- New Import

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites(); // <--- Get functions
  
  // Check if this recipe is already favorited
  const isFavorite = recipe && favorites.some(f => f.idMeal === recipe.idMeal);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10 text-2xl">Cooking up the details... 🍳</h2>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full md:w-1/2 rounded-xl shadow-lg object-cover h-[400px]" />
        
        <div className="md:w-1/2 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.strMeal}</h1>
          
          {/* FAVORITE BUTTON */}
          <button 
            onClick={() => isFavorite ? removeFromFavorites(recipe.idMeal) : addToFavorites(recipe)}
            className={`mb-6 px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${
              isFavorite 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isFavorite ? "♥ Removed from Favorites" : "♡ Add to Favorites"}
          </button>

          <div className="flex gap-4 mb-6">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">{recipe.strCategory}</span>
            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">{recipe.strArea}</span>
          </div>

          <h3 className="text-2xl font-bold mb-3">Ingredients</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Instructions</h2>
        <p className="text-gray-700 leading-8 text-lg whitespace-pre-line bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {recipe.strInstructions}
        </p>
      </div>

      {recipe.strYoutube && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-4">Video Tutorial</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe src={getYoutubeEmbed(recipe.strYoutube)} title="YouTube video player" className="w-full h-[400px] md:h-[600px] rounded-xl shadow-lg" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;