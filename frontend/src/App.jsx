import React from 'react'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./index.css"
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'

const App = () => {
  return (
    <div className='app w-full h-screen flex justify-center items-center bg-gray-50'>
      <Router>
        <Routes>

          <Route path="/"
            element={
              <>
                <Home/>
              </>
            }
          />

          <Route path='/login'
              element={
                <>
                  <h1> this is the login page </h1>
                  <Home/>
                </>
              }
          />

          <Route path='/profile'
              element={
                <>
                  <h1> this is the profile </h1>
                  <LeftSidebar />
                  <RightSidebar/>
                </>
              }
          />

        </Routes>
      </Router>
    </div>
  )
}

export default App
