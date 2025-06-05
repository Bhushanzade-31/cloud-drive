import React from 'react'
import './Start.css'

import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='start'>
      
       <img className='container'
      
        src="https://images.unsplash.com/photo-1690439132721-b9e40f05b781?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>
            Get Started with Mydrive
          </h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      
    </div>
  )
}

export default Start