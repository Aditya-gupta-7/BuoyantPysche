import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../components/Image'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'

const fetchPost = async (slug) => {
  const res =await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
}


export default function SinglePostPage() {
  
  const {slug} = useParams();
  
  const {isPending, error, data} = useQuery({
      queryKey: ['post', slug],
      queryFn: () => fetchPost(slug),
      enabled: !!slug,
  })

  if(isPending) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if(!data) return <div>No post found</div>

  return (
    <div className='flex flex-col gap-8'>
      {/* detail */}
      <div className="flex gap-8"> 
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
           
            <span>Written by</span>
            <Link className='text-blue-800'>{data.user.username}</Link>
            <span>on</span>
            <Link className='text-blue-800'>{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className='text-gray-500 font-medium'>
            {data.desc}
          </p>
        </div>
        {data.img && <div className="hidden lg:block w-2/5">
          <Image src={data.img} w='600' className='rounded-2xl'/>
        </div>}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam ad quaerat magni iure sit consequuntur nisi commodi! Laborum libero molestiae, voluptate blanditiis, a placeat nam eos, incidunt cum tempora aspernatur nobis fuga magnam. Beatae, neque optio. Nam quo inventore earum. lorem1000
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, corrupti debitis! Nisi sunt suscipit aperiam exercitationem explicabo nobis ipsum sit voluptatibus quasi veritatis, ratione, modi pariatur quis quod dolore mollitia nihil cum, earum velit dicta aliquid quaerat perspiciatis facilis. Vitae?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, corrupti debitis! Nisi sunt suscipit aperiam exercitationem explicabo nobis ipsum sit voluptatibus quasi veritatis, ratione, modi pariatur quis quod dolore mollitia nihil cum, earum velit dicta aliquid quaerat perspiciatis facilis. Vitae?
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          {data.user.img && <div className="flex items-center gap-8">
            <Image src={data.user.img} className='w-12 h-12 rounded-full object-cover' w='48' h='48'/>
            <Link>{data.user.username}</Link>
          </div>}
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur
          </p>
          <div className="flex gap-2"> 
            <Link>
              <img src="facebook.svg" alt="facebook" />
            </Link>
            <Link>
              <img src="instagram.svg" alt="instagram" />
            </Link>
          </div>
          <PostMenuAction post={data}/>
          <h1 className='mb-4 text-sm font-medium'>Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
          <Link className='underline'>All</Link>
          <Link className="underline" to="/">
            Web Design
          </Link>
          <Link className="underline" to="/">
            Development
          </Link>
          <Link className="underline" to="/">
            Databases
          </Link>
          <Link className="underline" to="/">
            Search Engines
          </Link>
          <Link className="underline" to="/">
            Marketing
          </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search/>
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  )
}
