import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './Profile'
import Home from './Home'
import Login from './Login'
import Feed from './Feed'
import SignUp from './SignUp'


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
                    path: "/profile/:id",  
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
        },
        {
            path: "/signup",
            element: <SignUp />
        }
    ])
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body 
