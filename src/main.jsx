import './index.css';
import App from './App.jsx';
import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom"; // Correct import
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import PostListPage from "./routes/PostListPage";
import Register from "./routes/Register";
import SinglePostPage from "./routes/SinglePostPage";
import Write from "./routes/Write";
import Layout from "./layouts/Layout";
import { ClerkProvider } from '@clerk/clerk-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/posts",
          element: <PostListPage />,
        },
        {
          path: "/:slug",
          element: <SinglePostPage />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <Register />,
        }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);