"use client"
import Spinner from '@/components/Spinner';
import SupStar from '@/components/SupStar'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/constants';
import { auth } from '@/services/firebase';
import useAuthentication from '@/services/useAuthentication';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignUp() {
  const [loading, setLoading] = useState(false)
  useAuthentication()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(true);
  const router = useRouter()


  const onSubmit = async(data) => {
    // console.log(data)
    if(data.password !== data.confirmPassword){
      toast.error("Passwords do not Match")
      return
    }
    setLoading(true)
    await createUserWithEmailAndPassword(auth,data.email, data.password)
    .then((res) => {
      // console.log(res)
      toast.success("Account Created")
      router.push(LOGIN_ROUTE)
    })
    .catch((error) => {
      toast.error("Email Already in Use")
      router.push(LOGIN_ROUTE)
    });
    setLoading(false)
  }

  return (
    <>
      {
        loading ? (<div className=' h-screen flex justify-center items-center'><Spinner/></div>)
        : (
          <div className=' flex h-screen justify-center items-center flex-col'>
            <p className=' text-4xl font-bold text-center mb-14'>Sign Up</p>
            <div className=' min-w-[350px] flex flex-col gap-4'>
              <form className=' flex flex-col gap-6 justify-center' onSubmit={handleSubmit(onSubmit)}>
                <label>
                  <p>Enter Your Email<SupStar/></p>
                  <input type='email' placeholder='Enter Email Address' className='form-field' {...register("email",{required: true})}/>
                  {
                    errors.email && <p className=' form-error'>Email is Required</p>
                  }
                </label>
                <label className=' relative'>
                  <p>Enter Your Password<SupStar/></p>
                  <input type={showPassword ? "text" : "password"} name="password" id="password" {...register("password",{required: true})} className="form-field" placeholder='Enter Password'/>
                      <span className='absolute right-3 top-[38px] cursor-pointer'
                      onClick={() => setShowPassword((prev) => !prev)}>
                          {
                              showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                          }
                      </span>  
                  {
                    errors.password && <p className=' form-error'>Password is Required</p>
                  }
                </label>
                <label className=' relative'>
                  <p>Enter Confirm Password<SupStar/></p>
                  <input type={showCnfPassword ? "text" : "password"} name="cnfPassword" id="confirmPassword" {...register("confirmPassword",{required: true})} className="form-field" placeholder='Enter Confirm Password'/>
                      <span className='absolute right-3 top-[38px] cursor-pointer'
                      onClick={() => setShowCnfPassword((prev) => !prev)}>
                          {
                              showCnfPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                          }
                      </span>  
                  {
                    errors.confirmPassword && <p className=' form-error'>Confirm Password is Required</p>
                  }
                </label>
                <button type="submit" className=' bg-black rounded-3xl px-8 py-3 text-white'>Create Account</button>
              </form>
              <p className=' text-center'>Already have an Account! <Link href={LOGIN_ROUTE} className=' font-semibold underline'>Login</Link></p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SignUp
