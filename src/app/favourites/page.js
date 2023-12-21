"use client"
import ImageCard from '@/components/ImageCard'
import Spinner from '@/components/Spinner'
import FavouriteCard from '@/components/FavouriteCard'
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '@/constants'
import { auth } from '@/services/firebase'
import { addItem, deleteItem, getItems } from '@/services/firestoreService'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Favourites() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState()
  const [data, setData] = useState([])

  const logout = () => {
    signOut(auth).then((res) => {
      toast.success("Logged Out Successfully")
      router.push(LOGIN_ROUTE)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  useEffect(() => {
    setEmail(auth?.currentUser?.email)
  },[auth])

  const fetchFavourites = async() => {
    setLoading(true)
    const items =  await getItems(email)
    setData(items)
    setLoading(false)
  }

  useEffect(() => {
    if(email) fetchFavourites()
  },[email])

  const handleDeleteItem = async(gif) => {
    let foundElement;
    const itemExists = data.some((ele) => {
      if(ele.item.id === gif.id){
        foundElement = ele
        return true
      }
    });
    await deleteItem(email,foundElement.id)
    fetchFavourites()
  }

  return (
    <div className=' flex justify-center items-center flex-col'>
    <div className=' relative w-full'>
      <div className=' bg-black text-base font-bold text-white p-4 px-10 fixed top-0 w-full flex gap-6 justify-end items-center'>
        <button className=' text-red-400' onClick={() => router.push(DASHBOARD_ROUTE)}>Home</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
      <div className=' w-3/4 pt-20 pb-10 flex flex-col'>
        {
          loading ? (<Spinner/>) :
          ( data?.length ? ( 
              <div className=' grid grid-cols-3 gap-6'>
              {
                data.map((gif) => (
                  <FavouriteCard gif={gif.item} key={gif.id} handleDeleteItem={handleDeleteItem}/>
                ))
              }
              </div> ) : (
              <div className=' text-2xl text-center'>No Favourites Gifs</div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Favourites