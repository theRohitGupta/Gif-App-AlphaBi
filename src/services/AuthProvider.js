"use client";
import Spinner from "@/components/Spinner";
import { auth } from "@/services/firebase";
import { createContext, useContext, useEffect, useState } from "react";


const Context = createContext({});

const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true)
    const initialState = {
        user:null,
        isLogin:false
    }
    const [user, setUser] = useState(initialState);

    useEffect(()=>{
        const subscribe = auth.onAuthStateChanged((userState)=>{
            setUser({isLogin: userState ? true : false, user: userState});
            setLoading(false);
        });
        return subscribe;
    },[])

    // console.log("User State ",user.user)

    return (
        <Context.Provider value={{user,setUser}}>
            {loading && (<div className="h-screen flex w-full justify-center items-center"><Spinner/></div>)}
            {!loading && children}
        </Context.Provider>
    )
}

export const AuthContext = () => useContext(Context);

export default AuthProvider;