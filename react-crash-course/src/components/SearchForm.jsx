import { useState, useEffect, useRef } from "react"
import React from 'react'

export default function SearchForm({search,setSearch,handleSearch}) {
  
        const inputRef = useRef(null)

        const onSearch = (e) => {
                e.preventDefault()
                handleSearch(search)
        }

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, [])
    
    return (

    <form onSubmit={onSearch} className="flex items-center gap-2">
      <input
        type="text"
        value={search}
        ref={inputRef}
        onInput={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="text-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Search
      </button>
    </form>
  )
}
