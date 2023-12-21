"use client"
import React, { useEffect, useState } from 'react'

function Favourites() {

  const logout = () => {
    signOut(auth).then((res) => {
      toast.success("Logged Out Successfully")
      router.push(LOGIN_ROUTE)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <div className=' flex h-screen justify-center items-center flex-col relative'>
      <div className=' bg-black text-base font-bold text-white p-4 px-10 absolute top-0 w-full flex gap-6 justify-end items-center'>
        <button className=' text-red-400' onClick={() => router.push(FAVOURITES_ROUTE)}>Favourites</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Favourites