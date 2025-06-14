import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

export default function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounder-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
            to='./posts'
            className='bg-blue-800 text-white rounded-full px-4 py-2'    
        >
            All posts
        </Link>
        <Link
            to='./posts?cat=web-design'
            className='hover:bg-blue-50 rounded-full px-4 py-2'    
        >
            Web design
        </Link>
        <Link
            to='./posts?cat=development'
            className='hover:bg-blue-50 rounded-full px-4 py-2'    
        >
            Development
        </Link>
        <Link
            to='./posts?cat=marketing'
            className='hover:bg-blue-50 rounded-full px-4 py-2'    
        >
            Marketing
        </Link>
        <Link
            to='./posts?cat=databases'
            className='hover:bg-blue-50 rounded-full px-4 py-2'    
        >
            Databases
        </Link>
        <Link
            to='./posts?cat=seo'
            className='hover:bg-blue-50 rounded-full px-4 py-2'    
        >
            Search Engines
        </Link>
        {/* search */}
        </div>
        <span className='text-xl font-medium'>
        |
        </span>
        <Search/> 
    </div>
  )
}
