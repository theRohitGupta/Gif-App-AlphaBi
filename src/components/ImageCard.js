import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'

function ImageCard({gif,handleAddItem,handleDeleteItem,data}) {
  console.log("INSIDE IMAGE",data)
  const [added, setAdded] = useState([])
  let addedItems = []
  data.map((ele) => { 
    addedItems.push(ele.item.id)
  })
  console.log(addedItems)
  return (
    <div className='w-1/3 flex flex-col gap-2'>
        <img src={gif.url} alt={gif.title} loading='lazy' className=' object-cover w-full min-w-[300px] aspect-square'/>
        <div className=' flex justify-between'>
          <div>
              <p className=' text-sm font-semibold line-clamp-1'>{gif.title}</p>
              <p className=' text-black text-xs'>@{gif.username}</p>
          </div>
          <button className='p-3 aspect-square bg-[#E8EAEE] rounded-full' onClick={() => handleAddItem(gif)}>
            <FaHeart className={`text-red-600 text-lg`}/>
          </button>
        </div>
    </div>
  )
}

export default ImageCard