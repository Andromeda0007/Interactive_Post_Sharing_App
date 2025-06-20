import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Body from './Body';

const App = () => {
  return (
    <div className="app w-full h-screen flex justify-center items-center bg-gray-50">
      <Body />
    </div>
  );
};

export default App;
