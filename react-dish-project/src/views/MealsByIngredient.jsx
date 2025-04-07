import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import { MealCard } from '../components/MealCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

export default function MealsByIngredient() {
  const { ingredient } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError(`Failed to fetch meals: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, [ingredient]);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-center text-gray-400">Meals with "{ingredient}"</h1>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}
