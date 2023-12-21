import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'

function FavouriteCard({gif, handleDeleteItem}) {

  return (
    <div className='w-full h-full flex flex-col gap-2'>
        <img src={gif.url} alt={gif.title} loading='lazy' className=' object-cover aspect-square'/>
        <div className=' flex justify-between'>
          <div>
              <p className=' text-sm font-semibold line-clamp-1'>{gif.title}</p>
              <p className=' text-black text-xs'>@{gif.username}</p>
          </div>
          <button className='p-3 aspect-square bg-[#E8EAEE] rounded-full' onClick={() => handleDeleteItem(gif)}>
            <FaHeart className={`text-red-600 text-lg`}/>
          </button>
        </div>
    </div>
  )
}

export default FavouriteCard