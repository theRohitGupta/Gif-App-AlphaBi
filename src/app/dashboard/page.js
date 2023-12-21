"use client"
import ImageCard from '@/components/ImageCard';
import Spinner from '@/components/Spinner';
import { LOGIN_ROUTE } from '@/constants';
import { auth } from '@/services/firebase';
import useAuthentication from '@/services/useAuthentication';
import axios from 'axios'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import { addItem, deleteItem, getItems, updateItem } from '@/services/firestoreService'

function Dashboard() {
  useAuthentication()
  const [query, setQuery] = useState("")
  const [gifs, setGifs] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 3
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState([1,2,3])
  const [pageNumber, setPageNumber] = useState(1)
  const router = useRouter()

  const giphyApiKey = process.env.GIPHY_API_KEY
  const giphyApiUrl = process.env.GIPHY_API_URL

  const logout = () => {
    signOut(auth).then((res) => {
      toast.success("Logged Out Successfully")
      router.push(LOGIN_ROUTE)
    }).catch((err) => {
      console.log(err.message)
    })
  }
  const [email,setEmail] = useState(null)
  useEffect(() => {
    setEmail(auth?.currentUser?.email)
  },[auth])
  // console.log(email)

  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState()
  const [updatedItemList, setUpdatedItemList] = useState([])

  const fetchData = async() => {
    const items =  await getItems(email)
    setData(items)
  }

  // console.log(data)

  useEffect(() => {
    if(email) fetchData()
  },[email])

  const handleAddItem = async(newItem) => {
    // console.log(newItem)
    // console.log(data)
    data.map((ele) => {
      if(ele.item.id === newItem.id){
        // console.log("YES")
        return
      } 
    })
    await addItem(email,newItem)
    setNewItem()
    fetchData()
  }

  const handleDeleteItem = async(email,id) => {
    await deleteItem(id)
    fetchData()
  }

  useEffect(() => {
    // Create a cancellation token inside the useEffect
    let cancelToken = axios.CancelToken.source();

    const fetchData = async () => {
      setOffset(0);
      setLoading(true);

      if (cancelToken) {
        // Cancel the previous request before making a new one
        cancelToken.cancel();
      }

      cancelToken = axios.CancelToken.source();

      try {
        const res = await axios.get(giphyApiUrl, {
          params: {
            api_key: giphyApiKey,
            q: query,
            offset,
          },
          cancelToken: cancelToken.token,
        });

        const newGifs = res.data.data.map((gif) => ({
          id: gif.id,
          url: gif.images.fixed_height.url,
          title: gif.title,
          username: gif.username,
        }));

        setGifs(newGifs);
      } catch (err) {
        if (axios.isCancel(err)) {
          // console.log("REQUEST CANCELLED");
        } else {
          console.log(err);
        }
      }

      setLoading(false);
    };

    // Debounce the fetchData function using a setTimeout
    const debounceFetchData = setTimeout(() => {
      if (query !== "") {
        fetchData();
      } else {
        setGifs([]);
      }
    }, 500);

    // Cleanup function to cancel ongoing requests
    return () => {
      if (cancelToken) {
        cancelToken.cancel();
      }
      clearTimeout(debounceFetchData);
    };
  }, [query, offset]);

  const handleNext = () => {
    let newPages = []
    if(pageNumber > 16){
      return
    }else{
      setPageNumber((prev) => prev+1)
      pages.forEach((ele) => newPages.push(ele+1))
    }
    setPages(newPages)
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    let newPages = []
    if(pageNumber > 2){
      setPageNumber((prev) => prev-1)
      pages.forEach((ele) => newPages.push(ele-1))
    }else {
      newPages = [1,2,3]
      setPageNumber(newPages[0])
    }
    setPages(newPages)
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const pagination = (page) => {
    let newPages = []
    if(page > 16) return
    if(page > 1){
      newPages = [page-1,page,page+1] 
      setPageNumber(page)
    }
    else{
      newPages = [1,2,3]
      setPageNumber(newPages[0])
    }
    setPages(newPages)
    setOffset(page*limit - limit);
  };

  return (
    <div className=' flex h-screen justify-center items-center flex-col relative'>
      <div className=' bg-black text-base font-bold text-white p-4 px-10 absolute top-0 w-full flex gap-6 justify-end items-center'>
        <button className=' text-red-400'>Favourites</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div className=' w-3/4 rounded-xl bg-white aspect-video flex flex-col gap-4 py-8'>
        <div className=' mx-4 flex gap-1'>
          <div className='p-0 rounded-[0.5em] px-8 flex gap-2 items-center mx-2 bg-[#E8EAEE] w-full text-lg'>
            <FaSearch className=' text-2xl'/>
            <input name='query' type='text' className=' outline-none p-4 w-full bg-[#E8EAEE]' placeholder='Search Gifs' value={query} onChange={(e) => setQuery(e.target.value)}/>
          </div>
          <button className=' bg-black rounded-[0.5em] px-8 py-3 text-white w-fit' onClick={() => fetchData()}>Submit</button>
        </div>
        <div className=' mx-6 flex flex-col justify-center items-center h-full'>
          {
            loading ? (<Spinner/>) :
            ( gifs?.length ? ( 
              <div className=' flex flex-col gap-10 '>
                <div className=' flex flex-row gap-4 w-full'>
                {
                  gifs.slice(offset,offset+limit).map((gif) => (
                    <ImageCard gif={gif} key={gif.id} handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem} data={data}/>
                  ))
                }
                </div>
                <div className=' flex flex-row gap-8 justify-center '>
                  <button className={` bg-black rounded-[0.5em] px-4 py-2 text-white w-fit ${pageNumber < 2 ? " cursor-not-allowed bg-gray-400" : ""}`} disabled={pageNumber < 2 ? true : false} onClick={() => handlePrevious()}>PREVIOUS</button>
                  <div className=' flex gap-4 justify-center'>
                    {
                      pages.map((v,i) => (
                        <button key={i} onClick={() => pagination(v)} className={`border-b-4 border-black px-2 ${pageNumber == v ? "bg-[#E8EAEE]" : ""}`}>{v}</button>
                      ))
                    }
                  </div>
                  <button className={` bg-black rounded-[0.5em] px-4 py-2 text-white w-fit ${pageNumber > 16 ? " cursor-not-allowed bg-gray-400" : ""}`} onClick={() => handleNext()} disabled={pageNumber > 16 ? true : false}>NEXT</button>
                </div>
              </div> ) : (
                <div className=' text-2xl'>Search Something <span className=' text-3xl'>☝️</span></div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
