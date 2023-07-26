import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import {BiSearchAlt} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const PostWall = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts`);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleClick = (imageData) => {
    setSelectedImage(imageData);
    navigate('/image', { state: { selectedImage: imageData, posts } });
  };

  const addPost = () => {
    navigate('/create');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-200">
      <div><img src='/client/public/logoImg.9635e655c9b2f2d82717.png' alt='logo'/></div>
      <button className="text-3xl flex justify-end  p-10" onClick={addPost}>
        <AiOutlinePlusSquare />
        <div className='ml-4'><BiSearchAlt/></div>
      </button>
      <div className="gap-1 columns-2 p-2">
        {posts.map((post, index) => (
          <div key={index} className="w-[100%] mt-2">
            {post.mediaType === 'image' ? (
              <img
                src={post.mediaUrl}
                alt={post.description}
                className="w-full h-full rounded-[10px] object-cover cursor-pointer"
                loading="lazy" // Implement lazy loading for images
                onClick={() => handleClick(post)}
              />
            ) : (
              <video src={post.mediaUrl} alt={post.description} className="w-full h-full" controls />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWall;
