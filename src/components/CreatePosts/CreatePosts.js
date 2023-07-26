import React from 'react'
import {AiOutlinePlusSquare,AiFillCloseCircle} from 'react-icons/ai'
import {BsFilePlus} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'



const CreatePosts = () => {
    const navigate = useNavigate();
    const selectImage = () => {
        navigate('/pick-image')
    }
  return (
      <div className='bg-[#e9e9e9] p-8 mx-auto flex flex-col justify-center items-center text-2xl gap-10 rounded-2xl'>
          <div className='pl-[16rem]'>
                <button onClick={() => navigate('/')}>
                <AiFillCloseCircle />
              </button>
          </div>
          <button onClick={()=>selectImage()} className='flex justify-around items-center cursor-pointer px-5 '>
              <div className='pr-5'><AiOutlinePlusSquare /></div>
              <p>Create a Post</p>
          </button>
          <button className='flex justify-around items-center cursor-pointer px-5 '>
              <div className='pr-5'><BsFilePlus /></div>
              <p >Create a Story</p>
          </button>
      </div>
  )
}

export default CreatePosts