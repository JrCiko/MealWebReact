import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setIngredients(data.meals || []);
      } catch (err) {
        setError(`Failed to fetch ingredients: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-center text-gray-400">Ingredients</h1>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {ingredients.map((ingredient, index) => (
            
              <Link key={ingredient.idIngredient} to={`/ingredient/${ingredient.strIngredient}`}>
                <Card>
                <h2 className="text-lg font-bold">{ingredient.strIngredient}</h2>
                </Card>
              </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
}