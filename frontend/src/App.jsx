import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Body from './components/Body';
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div className="app w-full h-screen flex justify-center items-center bg-gray-50">
      <Body />
      <Toaster />
    </div>
  );
};

export default App; 
