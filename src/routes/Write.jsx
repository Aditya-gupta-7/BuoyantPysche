import React, { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../components/Upload';



export default function Write() {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`)
  }, [img])
  useEffect(() => {
    video && setValue((prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`)
  }, [video])
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    },
    onSuccess: (res) => {
      toast.success('Post created successfully');
      setHasSubmitted(false); 
      navigate(`/${res.data.slug}`);
    }
  })

  if (!isLoaded) return <div>Loading...</div>
  if (isLoaded && !isSignedIn) return <div>Sign in to write a post</div>

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true); // <== Set this flag

    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    }
    if (!data.title || !data.content || !data.desc) {
      toast.error("Title, description, and content are required.");
      return;
    }
    console.log(data)
    mutation.mutate(data)
  };


  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 '>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button type="button" className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>
            Add a cover Image
          </button>
        </Upload>
        <input className='text-4xl font-semibold bg-transparent outline-none' type="text" placeholder='My awesome story' name='title' />
        <div className="flex items-center gap-4">
          <label htmlFor="" className='text-sm'>Choose a category:</label>
          <select name="category" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="general">General</option>
            <option value="web-design">Web design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea className='p-4 rounded-xl bg-white shadow-md' name="desc" placeholder='A short desc' />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🏙️
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue} className='flex-1 rounded-xl bg-white shadow-md'
            readOnly={(0 < progress && progress < 100)}
          />
        </div>
        <button disabled={mutation.isPending || (0 < progress && progress < 100)} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>
          {mutation.isPending ? "Loading" : "Send"}
        </button>
        {"Progress: " + progress + "%"}
        {hasSubmitted && mutation.isError && (
          <div className='text-red-500'>
            {mutation.error?.response?.data?.message || "Something went wrong"}
          </div>
        )}
      </form>
    </div>
  )
}
