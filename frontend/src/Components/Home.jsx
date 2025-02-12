import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className='w-full h-full lg:w-auto flex flex-col text-white md:rounded-lg bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 sm:border sm:border-white lg:h-[570px]'>
      <Navbar/>
      <div className='flex flex-1 overflow-auto sm:w-auto w-screen lg:h-[470px] min-h-0 '>
        <Sidebar/>
        <MessageContainer/>
      </div>
    </div>
  )
}

export default Home