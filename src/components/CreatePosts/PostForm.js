import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editedImageBlob = location.state?.editedImage;

  const [editedImageURL, setEditedImageURL] = useState('');

  useEffect(() => {
    const blobToDataURL = (blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    };

    if (editedImageBlob) {
      blobToDataURL(editedImageBlob).then((dataURL) => {
        setEditedImageURL(dataURL);
      });
    }
  }, [editedImageBlob]);

  const [description, setDescription] = useState('');
  const [locationValue, setLocationValue] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const tagOptions = [
    { value: 'photography', label: 'Photography' },
    { value: 'food', label: 'Food' },
    { value: 'gaming', label: 'Gaming' },
    // Add more tag options as needed
  ];

  const locationOptions = [
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    // Add more location options as needed
  ];

  const handleTagClick = (tagValue) => {
    if (selectedTags.includes(tagValue)) {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagValue));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagValue]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('ImageUrl:', editedImageURL);
    console.log('Description:', description);
    console.log('Location:', locationValue);
    console.log('Tags:', selectedTags);

    try {
      await axios.post('http://localhost:5000/api/posts', {
        mediaUrl: editedImageURL,
        mediaType: 'image',
        description,
        location: locationValue,
        tags: selectedTags,
      });

      console.log('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }

    navigate('/');
    
  };

  return (
    <div className='flex flex-col p-10 w-full'>
      <button type='submit' className='bg-[#00b2e8] p-2 rounded-full w-32 ml-56 text-white' onClick={handleSubmit}>
        Submit
      </button>
      <div className='w-20 h-20'>
        <img src={editedImageURL} className='w-full h-auto overflow-hidden rounded-xl' alt='EditedImage' />
      </div>

      <form onSubmit={handleSubmit} className='flex gap-10 flex-col'>
        <div className='flex flex-col'>
          <label htmlFor='description' className='text-[#00b2e8] font-black'>
            Description:
          </label>
          <textarea
            className='border-2 border-[#00b2e8]'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='location'>Location:</label>
          <select value={locationValue} onChange={(e) => setLocationValue(e.target.value)}>
            <option value=''>Select location (optional)</option>
            {locationOptions.map((locationOption) => (
              <option key={locationOption.value} value={locationOption.value}>
                {locationOption.label}
              </option>
            ))}
          </select>
        </div>
            </form>

        <div className='flex flex-col'>
          <label htmlFor='tags'>Tags:</label>
          <div className='flex flex-wrap'>
            {tagOptions.map((tagOption) => (
              <button
                key={tagOption.value}
                className={`p-2 m-1 rounded-full ${
                  selectedTags.includes(tagOption.value) ? 'bg-[#00b2e8]' : 'bg-gray-300'
                }`}
                onClick={() => handleTagClick(tagOption.value)}
              >
                {tagOption.label}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

export default FormPage;
