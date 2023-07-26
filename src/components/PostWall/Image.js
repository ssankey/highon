import React from 'react';
import { useLocation } from 'react-router-dom';

const Image = () => {
  const location = useLocation();
  const imageData = location.state?.selectedImage;
  const posts = location.state?.posts;

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <img src={imageData.mediaUrl} alt={imageData.description} className="w-full h-48 object-cover" />
        <p className="text-gray-600 mt-4">{imageData.description}</p>
        <div className="mt-2">
          {imageData.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {posts.map((post, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
          <img src={post.mediaUrl} alt={post.description} className="w-full h-48 object-cover" />
          <p className="text-gray-600 mt-4">{post.description}</p>
          <div className="mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Image;
