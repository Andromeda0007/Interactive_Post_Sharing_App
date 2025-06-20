import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './components/Profile'
import Home from './components/Home'
import Login from './components/Login'
import Feed from './components/Feed'


const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Home />,
            children:[
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/profile",
                    element: <Profile />
                }
            ]
        },
        {
            path:"/login",
            element: <Login />
        },
        {
            path:"/profile",
            element: <Profile />
        }
    ])
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
