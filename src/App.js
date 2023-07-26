import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostWall from './components/PostWall/PostWall.js';
import CreatePosts from './components/CreatePosts/CreatePosts.js';
import PickImage from './components/CreatePosts/PickImage.js';
import ImageEditor from './components/CreatePosts/ImageEditor.js';
import PostForm from './components/CreatePosts/PostForm.js';
import Image from './components/PostWall/Image';

const App = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[400px] mx-auto bg-white">
          <Routes>
            <Route exact path="/" element={<PostWall />} />
            <Route path="/create" element={<CreatePosts />} />
            <Route path="/pick-image" element={<PickImage />} />
            <Route path="/edit-image" element={<ImageEditor />} />
            <Route path="/create-post" element={<PostForm />} />
            <Route path='/image' element={<Image/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
