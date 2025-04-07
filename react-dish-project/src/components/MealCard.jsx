import { Link } from 'react-router-dom';

export function MealCard({ meal }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-800 text-white">
      <Link to={`/meal/${meal.idMeal}`}>
        <img
          className="w-full"
          src={meal.strMealThumb}
          alt="Meal"
        />
        
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-white">{meal.strMeal}</div>
          {meal.strInstructions &&<p className="text-gray-400 text-base">
            {meal.strInstructions.slice(0, 100)}...
          </p>}
        </div>
      </Link>
      {meal.strYoutube && (
        <div className="px-6 py-4">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}