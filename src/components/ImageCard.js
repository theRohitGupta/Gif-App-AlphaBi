import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'

function ImageCard({gif, handleAddItem, handleDeleteItem, addedItems}) {

  const [favourited, setFavourited] = useState(addedItems.includes(gif.id) ? true : false)

  const handleToggleFavourited = () => {
    setFavourited((prev) => !prev);
    if (!favourited) handleAddItem(gif)
    else handleDeleteItem(gif.id);
  };

  return (
    <div className='w-1/3 flex flex-col gap-2'>
        <img src={gif.url} alt={gif.title} loading='lazy' className=' object-cover w-full min-w-[300px] aspect-square'/>
        <div className=' flex justify-between'>
          <div>
              <p className=' text-sm font-semibold line-clamp-1'>{gif.title}</p>
              <p className=' text-black text-xs'>@{gif.username || gif.title.split(' ')[0]}</p>
          </div>
          <button className='p-3 aspect-square bg-[#E8EAEE] rounded-full' onClick={() => handleToggleFavourited()}>
          {
            favourited ? <FaHeart className={`text-red-600 text-lg`}/> : <FaHeart className=' text-gray-500 text-lg'/>
          }
          </button>
        </div>
    </div>
  )
}

export default ImageCard