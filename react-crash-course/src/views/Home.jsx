import { MealCard } from '../components/MealCard.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import SearchForm from '../components/SearchForm.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1'

export default function Home() {
    const [search, setSearch] = useState('')
  const [meals, setMeals] = useState([])
  const [error, setError] = useState(null)
  const [heading, setHeading] = useState('Random Meals')
  const [loading, setLoading] = useState(false)

  const handleSearch = (query) => {
    console.log('Search Query', query)

    if (!query) {
      setHeading('Random Meals')
      fetchRandomMeals()
      return
    }
    setError('')
    setMeals([])
    setLoading(true)
    const url = `${API_BASE_URL}/search.php?s=${query}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHeading(`Search Results for "${query}"`)
        setMeals(data.meals || [])
        setError(null)
        console.log('Fetched Meals:', data.meals)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setError('Failed to fetch meals. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        setLoading(true)
        const randomMeals = []
        for (let i = 0; i < 6; i++) {
          const response = await fetch(`${API_BASE_URL}/random.php`)
          const data = await response.json()
          if (data.meals) randomMeals.push(data.meals[0])
        }
        setMeals(randomMeals)
        setError(null) // Clear any previous errors
        console.log('Random Meals:', randomMeals)
      } catch (error) {
        console.error('Error fetching random meals:', error)
        setError('Failed to fetch random meals. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchRandomMeals()
  }, [])
  return (
    <MainLayout>
          <div className='p-4'>
            <div className='flex justify-center my-4 bg-gray-900'>
              <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
            </div>
            <h2 className='text-3xl font-bold text-center text-gray-400'>{heading}</h2>
            {error && <p className="text-center text-red-500 py-4">{error}</p>}
            {loading ? (
              <LoadingIndicator />
            ) : meals && meals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-900">
                {meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            ) : (
              !error && <p className="text-center text-gray-400 py-8">No meals found</p>
            )}
          </div>
        </MainLayout>
  )
}