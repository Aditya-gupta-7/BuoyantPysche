import React from 'react'
import { Link } from 'react-router'
import MainCategories from '../components/MainCategories'
import FeaturedPosts from '../components/FeaturedPosts'
import PostList from '../components/PostList'

export default function HomePage() {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/*breadcrumb */}
      <div className="flex gap-4">
        <Link to='/'>Home</Link>
        <span>.</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/* {introduction} */}
      <div className="flex items-center justify-between">
        {/* title */}
        <div className=''>
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>
            Lorem ipsum dolor sit,
          </h1>
          <p className='mt-8 text-md md:text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea excepturi, facilis autem pariatur maxime officia error repellendus! Dicta dolores officia perferendis repellat quia ea quas eveniet enim quisquam nisi impedit unde vitae nam, atque totam cum possimus porro commodi nostrum!
          </p>
        </div>
        <Link to="write" className="hidden md:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            // className="text-lg tracking-widest animate-spin animatedButton"
            className="text-lg tracking-widest"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* categories */}
      <MainCategories/>
      {/* featured posts */}
      <FeaturedPosts/>
      {/* post list */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  )
}
