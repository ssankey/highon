import React, { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const EditImage = () => {
  const location = useLocation();
  const File = location.state && location.state.selectedFile;
  const selectedFile = URL.createObjectURL(File)
  const navigate = useNavigate();


  const [aspectRatio, setAspectRatio] = useState('1:1');
  const handleAspectRatioChange = (newAspectRatio) => {
    setAspectRatio(newAspectRatio);
    drawCroppedImage(newAspectRatio);
  };

  const [editedImage, setEditedImage] = useState('')

  const drawCroppedImage = (newAspectRatio) => {
    const imageObj = new Image();
    imageObj.onload = () => {
      const canvasEle = document.createElement('canvas');
      canvasEle.width = newAspectRatio.width
      canvasEle.height = newAspectRatio.height
      let croppedWidth = imageObj.width;
      let croppedHeight = imageObj.height;
      const ctx = canvasEle.getContext('2d');

      if (newAspectRatio === '1:1') {
        const size = Math.min(imageObj.width, imageObj.height);
        croppedWidth = size;
        croppedHeight = size;
      } else if (newAspectRatio === '4:5') {
        const targetHeight = (4 / 5) * imageObj.width;
        croppedWidth = Math.min(imageObj.width, targetHeight * (imageObj.width / imageObj.height));
        croppedHeight = (croppedWidth / (4 / 5));
      } else if (newAspectRatio === '16:9') {
        croppedHeight = (9 / 16) * imageObj.width;
        croppedWidth = Math.min(imageObj.width, croppedHeight * (16 / 9));
      }

      canvasEle.width = croppedWidth;
      canvasEle.height = croppedHeight;

      // Draw the cropped image on the canvas
      ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, croppedWidth, croppedHeight);


      canvasEle.toBlob((blob) => {
        setEditedImage(blob);
      }, 'image/jpeg', 1);
    };

    imageObj.src = selectedFile;
  };

  console.log(editedImage)



  const calculateWidth = () => {
    switch (aspectRatio) {
      case '1:1':
        return '100%';
      case '4:5':
        return '80%';
      case '16:9':
        return '140.78%';
      default:
        return '100%';
    }
  };


  const handleNextButtonClick = () => {
    navigate('/create-post', { state: { editedImage: editedImage } });
  };

  const goBack = () => {
    navigate('/pick-image');
  };



  return (
    <>
      <div className=' mb-10 w-full flex justify-between px-6'>
        <button className=' text-4xl px-2' onClick={goBack}>
          <BsArrowLeftShort />
        </button>

        <button onClick={handleNextButtonClick} className='px-5 rounded-full bg-blue-500 text-white '>
          Next
        </button>
      </div>
      <div className='bg-pink-300 w-[100%] p-16 flex justify-center items-center'>

        <div
          className="image-container"
          style={{
            width: '100%',
            height: '250px',
            position: 'relative',
            transition: 'height 0.5s ease, width 0.5s ease',
          }}
        >

          <div
            style={{
              width: calculateWidth(),
              height: aspectRatio === '1:1'
                ? '100%'
                : aspectRatio === '4:5'
                  ? '80%'
                  : '46.25%',
              position: 'relative',
              left: aspectRatio === '1:1' ? '0' : '50%',
              transform: aspectRatio === '1:1' ? 'none' : 'translateX(-50%)',
              transition: 'height 0.5s ease,width 0.5s ease',
            }}
          >
            <img
              src={selectedFile}
              alt="SelectedImage"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                borderRadius: '20px',
                top: 0,
                left: 0,
              }}
            />
          </div>
        </div>
      </div>


      <div className='mt-[5rem] w-full flex justify-around'>
        <div className='flex items-center justify-center flex-col'>
          <button onClick={() => handleAspectRatioChange('1:1')} >
            <div className='w-10 h-10 bg-gray-600 active:border active:border-blue-700 border-2'></div>
            1:1
          </button>
        </div>
        <div className='flex items-center justify-center flex-col'>
          <button>
            <div className='w-8 h-10 bg-gray-600'></div>
            4:5
          </button>
        </div>
        <div className='flex items-center justify-center flex-col'>
          <button onClick={() => handleAspectRatioChange('16:9')}>
            <div className='w-16 h-9 bg-gray-600'></div>
            16:9
          </button>
        </div>
      </div>
    </>
  );
};

export default EditImage;
