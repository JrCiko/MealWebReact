import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({children}) {
  return (
    <div className="bg-gray-900">
      <Header />
      <div className="p-4 bg-gray-900 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  )
}
