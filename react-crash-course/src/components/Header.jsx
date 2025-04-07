import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="bg-gray-800 flex items-center justify-between p-4 text-white">
      <Link to='/' className="text-lg font-bold">Meal Search</Link>
      <div className="flex gap-4 items-center">
        <NavLink to="/" className={({isActive}) => isActive ? 'text-indigo-600 p-2' : 'text-gray-400 p-2'}>Home</NavLink>
        <NavLink to="/ingredients" className={({isActive}) => isActive ? 'text-indigo-600 p-2' : 'text-gray-400 p-2'}>Ingredients</NavLink>
      </div>
    </nav>
  )
}
