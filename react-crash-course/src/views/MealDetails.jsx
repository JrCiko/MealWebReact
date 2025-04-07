import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

export default function MealDetails() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (err) {
        setError(`Failed to fetch meal details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchMealDetails();
  }, [mealId]);

  return (
    <MainLayout>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : meal ? (
        <div className="max-w-4xl mx-auto p-4 bg-gray-800 text-white rounded">
          <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded mb-4"
          />
          <p className="text-gray-400 mb-4">{meal.strInstructions}</p>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 inline-block mb-4"
            >
              Watch on YouTube
            </a>
          )}
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <ul className="list-disc list-inside text-gray-400">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => ({
                ingredient: meal[`strIngredient${num}`],
                measure: meal[`strMeasure${num}`],
              }))
              .filter((item) => item.ingredient)
              .map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-8">Meal not found</p>
      )}
    </MainLayout>
  );
}
